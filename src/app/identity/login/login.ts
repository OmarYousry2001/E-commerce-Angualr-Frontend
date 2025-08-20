import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';
import { CoreService } from '../../core/core-service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  formGroup: FormGroup;
  emailModel: string = '';
  returnUrl: string = '';  
  constructor(
    private fb: FormBuilder,
    private _identityService: IdentityService,
     private route: ActivatedRoute,
    private router: Router,
      private _toaService: ToastrService,  
      private _coreService: CoreService,  

      

  ) {}

  ngOnInit(): void {
    this.FormValidation();
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  FormValidation() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
          ),
        ],
      ],
    });
  }
  // return FormControl
  get _email() {
    return this.formGroup.get('email');
  }
  get _password() {
    return this.formGroup.get('password');
  }
  Submit() {
    if (this.formGroup.valid) {
      this._identityService.Login(this.formGroup.value).subscribe({
        next: (response) => {
          // console.log('Login successful', response);
          this._toaService.success('Welcome back!', 'Login successful');
          // this._coreService.setUserName(this.formGroup.value.email); 

                  this._coreService.getUserName().subscribe();

          this.router.navigateByUrl(this.returnUrl); // Redirect to returnUrl or another page after login
        },
        error: (error) => {
          this._toaService.error('Please check your Email or password and try again.', 'Login Failed');  
        },
      });
    }
  }

SendEmailForForgotPassword() {
  this._identityService.forgetPassword(this.emailModel).subscribe({
    next: (value) => {
      console.log(value);

      const modalElement = document.getElementById('exampleModal');
      if (modalElement) {
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        
        if (!modalInstance) {
          modalInstance = new bootstrap.Modal(modalElement);
        }

        modalInstance.hide();
        const backdrops = document.getElementsByClassName('modal-backdrop');
        while (backdrops.length > 0) {
          backdrops[0].parentNode?.removeChild(backdrops[0]);
        }
      }
      this._toaService.success('Please check your email for the reset link.', 'Email Sent');
    
    },
    error: (err) => {
      console.log(err);
    },
  });
}

}
