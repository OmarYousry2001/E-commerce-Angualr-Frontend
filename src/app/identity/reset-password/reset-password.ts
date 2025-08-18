import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../identity-service';
import { ResetPasswordForm } from '../../shared/Models/ResetPassword';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword {
  formGroup: FormGroup;
  ResetValue = new ResetPasswordForm();

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private _service: IdentityService,
    private route: Router,
   private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      this.ResetValue.email = param['email'];
      this.ResetValue.code = param['code'];
    });
    this.FormValidation();
  }

  FormValidation() {
    this.formGroup = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
            ),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
            ),
          ],
        ],
      },
      { validator: this.PasswordMatchValidation }
    );
  }

  PasswordMatchValidation(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMisMatch: true };
  }

  get _password() {
    return this.formGroup.get('password');
  }
  get _confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }

  Submit() {
    if (this.formGroup.valid) {
      this.ResetValue.password = this.formGroup.value.password;
      // console.log(this.ResetValue);

      this._service.ResetPassword(this.ResetValue).subscribe({
        next: () => {
          this._toastrService.success('Password reset successfully', 'Success ');
          this.route.navigateByUrl('/account/Login');
        },
        error(err) {
          this._toastrService.error(err.error.message, 'error'.toUpperCase());
          console.log(err);
        },
      });
    }
  }
}
