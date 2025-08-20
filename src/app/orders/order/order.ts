import { Component } from '@angular/core';
import { IOrder, IOrderItem } from '../../shared/Models/Order';
import { OrdersService } from '../orders-service';
import { environment } from '../../../environments/environment.development';
declare var bootstrap: any;
@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class Order {
  orders: IOrder[] = [];
  UrlImageModal: string[] = [];
   urlImages = environment.urlImages;

  constructor(private _service: OrdersService) {}
  ngOnInit(): void {
    this._service.getAllOrderForUser().subscribe({
      next: (value) => {
        this.orders = value.data;
        console.log('test orders', this.orders);  
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  OpenModal(order: IOrderItem[]) {
    this.UrlImageModal = order.map((x) => x.mainImage);
    var model = document.getElementById('ImageModal');
    var modalElement = new bootstrap.Modal(model);
    modalElement.show();
  }
  getFirstImageOrderItem(order: IOrderItem[]) {
    return order.length > 0 ? order[0].mainImage : null;
  }
  CloseModal() {
    var modal = document.getElementById('ImageModal');
    var instance = bootstrap.Modal.getInstance(modal);
    instance.hide();
  }
}
