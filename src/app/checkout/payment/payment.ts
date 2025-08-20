import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from '../../basket/BasketService';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../checkout-service';
import { IBasket } from '../../shared/Models/Basket';
import { ICreateOrder } from '../../shared/Models/Order';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.html',
  styleUrl: './payment.scss'
})
export class Payment {
  @Input() delivery: FormGroup;
  @Input() Address: FormGroup;

  constructor(
    private _service: CheckoutService,
    private toast: ToastrService,
    private basketService: BasketService,
    private router: Router
  ) {}

   SubmitOrder() {
    const basket = this.basketService.getCurrentValue();

    const order = this.getOrderCreate(basket);

    this._service.CreateOrder(order).subscribe({
      next: (value) => {
        this.basketService.deleteBasket();
        this.router.navigate(['/checkout/success'], {
          queryParams: { orderId: value.data.id },
        });
        console.log('From Payment', value.data.id );
        this.toast.success('Order Created Successfully', 'SUCCESS');
      },
      error: (er) => {
        console.log('Validation Errors:', er.error.errors);
        this.toast.error('something went wrong');
      },
    });
  }

  // this function is used to create the order object from the basket
   getOrderCreate(basket: IBasket): ICreateOrder {
    return {
      basketId: basket.id.toString(),
      deliveryMethodId: this.delivery.value.delivery,
      shipAddress: this.Address.value,
    };

  
}
}
