import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing-module';
import { SharedModule } from '../shared/shared-module';
import { RouterModule } from '@angular/router';
import { Basket } from './basket/basket';




@NgModule({
  declarations: [Basket ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule,

    
  ],

})
export class BasketModule { }
