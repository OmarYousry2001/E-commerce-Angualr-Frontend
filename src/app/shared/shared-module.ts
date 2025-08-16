import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OrderTotal } from './Component/order-total/order-total'; 


@NgModule({
  declarations: [
    OrderTotal
  ],
  imports: [
    CommonModule,
    PaginationModule
    
  ],
  exports:[PaginationModule , OrderTotal]
})
export class SharedModule { }
