import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ICreateOrder, IOrder, IShippingAddress } from '../shared/Models/Order';
import { IGenericResponse } from '../shared/Models/GenericResponse';
import { IDelivery } from '../shared/Models/Delivery';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
    baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAddress() {
    return this.http.get<IGenericResponse<IShippingAddress>>(this.baseURL + 'User/GetAddressForUser');
  }

    updateAddress(form: any) {
    return this.http.put(this.baseURL + 'User/UpdateAddress', form);
  }


  getDeliveryMethod() {
    return this.http.get<IGenericResponse<IDelivery[]>>(this.baseURL + 'DeliveryMethod/GetAll');
  }
  CreateOrder(order: ICreateOrder) {
    return this.http.post<IGenericResponse<IOrder>>(this.baseURL + 'Orders/Create', order);
  }
  
}
