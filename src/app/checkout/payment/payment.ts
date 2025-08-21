import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from '../../basket/BasketService';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../checkout-service';
import { IBasket } from '../../shared/Models/Basket';
import { ICreateOrder } from '../../shared/Models/Order';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-payment',
    standalone: false,
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss']
})
export class Payment implements OnInit, AfterViewInit, OnDestroy {
  @Input() delivery: FormGroup;
  @Input() Address: FormGroup;
  @Input() paymentForm: FormGroup;

  loader: boolean = false;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: string = '';
  orderId: number;

  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;

  constructor(
    private _service: CheckoutService,
    private toast: ToastrService,
    private basketService: BasketService,
    private router: Router
  ) {}

  async ngAfterViewInit(): Promise<void> {
    this.stripe = await loadStripe(environment.stripePublicKey);
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', (event) => this.onChange(event));

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', (event) => this.onChange(event));

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', (event) => this.onChange(event));
  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  ngOnInit(): void {}

  onChange(event: any) {
    this.cardErrors = event.error ? event.error.message : '';
  }

  async SubmitOrder() {
    if (!this.delivery || !this.Address || !this.paymentForm) {
      this.toast.error('Forms are not initialized', 'ERROR');
      return;
    }

    this.loader = true;
    const basket = this.basketService.getCurrentValue();
    const order = this.getOrderCreate(basket);

    try {
    
      const value = await this.CreateOrder(order);

 
      const paymentDetails = await this.confirmPaymentWithStripe(basket);
      if (paymentDetails.paymentIntent) {
        this.loader = false;
        this.toast.success('Order Created Successfully', 'SUCCESS');
        this.router.navigate(['/checkout/success'], {
          queryParams: { orderId: this.orderId },
        });
        this.basketService.deleteBasket();
      } else {
        this.loader = false;
        this.toast.error(paymentDetails.error.message, 'ERROR');
      }
    } catch (err: any) {
      this.loader = false;
      console.log(err);
      this.toast.error('Something went wrong', 'ERROR');
    }
  }

  async confirmPaymentWithStripe(basket: IBasket) {
    return await this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.paymentForm.get('nameOnCard').value,
        },
      },
    });
  }

  async CreateOrder(order: ICreateOrder) {
    const { lastValueFrom } = await import('rxjs');
    const value = await lastValueFrom(this._service.CreateOrder(order));
    this.orderId = value.data.id;
    return value;
  }

  getOrderCreate(basket: IBasket): ICreateOrder {
    return {
      basketId: basket.id.toString(),
      deliveryMethodId: this.delivery.value.delivery,
      shipAddress: this.Address.value,
    };
  }
}
