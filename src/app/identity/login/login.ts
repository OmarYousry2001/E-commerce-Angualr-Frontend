import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity-service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
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
          console.log('Login successful', response);
          this.router.navigateByUrl(this.returnUrl); // Redirect to home or another page after login
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
    }
  }

  SendEmailForgetpassword() {
    this._identityService.forgetPassword(this.emailModel).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
