import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing-module';
import { Register } from './register/register';
import { ReactiveFormsModule } from '@angular/forms';
import { Active } from './active/active';


@NgModule({
  declarations: [
    Register,
    Active
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule

  ]
})
export class IdentityModule { }
