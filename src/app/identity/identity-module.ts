import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing-module';
import { Register } from './register/register';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Active } from './active/active';
import { Login } from './login/login';


@NgModule({
  declarations: [
    Register,
    Active,
    Login
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class IdentityModule { }
