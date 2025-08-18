import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDelivery } from '../../shared/Models/Delivery';
import { CheckoutService } from '../checkout-service';
import { BasketService } from '../../basket/BasketService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery',
  standalone: false,
  templateUrl: './delivery.html',
  styleUrl: './delivery.scss'
})
export class Delivery {
  @Input() delivery: FormGroup;
  deliveries: IDelivery[] = [];
  constructor(
    private _service: CheckoutService,
    private basketService: BasketService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this._service.getDeliveryMethod().subscribe({
      next: (value) => {
        this.deliveries = value.data;
        console.log( 'omar dilevry ',value);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  SetShippingPrice() {
    const delivery = this.deliveries.find(
      (x) => x.id === this.delivery.value.delivery
    );
    console.log(delivery);
    this.basketService.SetShippingPrice(delivery);
  }

  // CreatePayment() {
  //   const id = this.deliveries.find(
  //     (m) => m.id == this.delivery.value.delivery
  //   ).id;
  //   this.basketService.CreatePaymentIntent(id).subscribe({
  //     next: (res) => {
  //       this.toast.success('Payment Intent Created', 'SUCCESS');
  //     },
  //     error(err) {
  //       console.log(err);
  //     },
  //   });
  // }
}
