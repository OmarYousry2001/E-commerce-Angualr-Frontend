import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {
 fromGroup: FormGroup;
constructor(
  private fb:FormBuilder,
  private _identityService: IdentityService,
  private _toastrService: ToastrService,  
  private _router: Router 

){}
  ngOnInit(): void {
    this.formValidation();
  }

  formValidation() {
    this.fromGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
          ),
        ],
      ],
      passwordConfirmation:[ '',Validators.required,]
    },
     { validators: this.passwordMatchValidator } // ✅ attach validator here
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('passwordConfirmation')?.value;

  return password === confirmPassword ? null : { mismatch: true };
}

  // return FormControl
  get _username() {
    return this.fromGroup.get('userName');
  }
  get _email() {
    return this.fromGroup.get('email');
  }
  get _DisplayName() {
    return this.fromGroup.get('displayName');
  }
  get _password() {
    return this.fromGroup.get('password');
  }
  get _passwordConfirmation() {
    return this.fromGroup.get('passwordConfirmation');
  }
 onSubmit() {
    this._identityService.register(this.fromGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this._toastrService.success(
          'Register success , please confierm your email',
          'success'.toUpperCase()
        );

        this._router.navigateByUrl('/account/Login');
      },
      error: (err: any) => {
        console.log(err);
        this._toastrService.error(err.error.message, 'error'.toUpperCase());
      },
    });
  }

}
