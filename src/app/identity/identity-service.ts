import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ActiveAccount } from '../shared/Models/ActiveAccount';
import { ResetPasswordForm } from '../shared/Models/ResetPassword';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
    baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(form: any) {
    return this.http.post(this.baseURL + 'User/Register', form);
  }
  activateAccount(param: ActiveAccount) {
   
    console.log( "Active Account: ",param);
    return this.http.post(this.baseURL + 'User/ConfirmEmail', param);
  }
Login(form: any) {
  return this.http.post(this.baseURL + 'Authentication/Login', form, {
    withCredentials: true
  });
}
  forgetPassword(email: string) {
    return this.http.get(
      this.baseURL + `Account/send-email-forget-password?email=${email}`
    );
  }
  ResetPassword(param: ResetPasswordForm) {
    return this.http.post(this.baseURL + 'Account/reset-password', param);
  }
}
