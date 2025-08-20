import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing-module';
import { Checkout } from './checkout/checkout';

import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../shared/shared-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Stepper } from './stepper/stepper';
import { Address } from './address/address';
import { Delivery } from './delivery/delivery';
import { MatRadioModule } from '@angular/material/radio';
import { Payment } from './payment/payment';


@NgModule({
  declarations: [
    Checkout,
    Stepper,
    Address,
    Delivery,
    Payment

  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatRadioModule,


  ],
    exports: [  ],
})
export class CheckoutModule { }
