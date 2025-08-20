import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/Models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders-service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-order-item',
  standalone: false,
  templateUrl: './order-item.html',
  styleUrl: './order-item.scss'
})
export class OrderItem implements OnInit {
  order: IOrder;
  id: string = '';
  urlImages = environment.urlImages;

  constructor(private route: ActivatedRoute, private _service: OrdersService) {}

   ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.id = param['id'];
    });
    
    this._service.getCurrentOrderForUser(this.id).subscribe({
      next: (value) => {
        this.order = value.data;
      },
      error: (er) => {
        
        console.log(er);
      }, 
    });
  }
}
