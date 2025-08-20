import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IOrder } from '../shared/Models/Order';
import { IGenericResponse } from '../shared/Models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
   constructor(private http: HttpClient) {}
  BaseURl = environment.baseUrl;
   getAllOrderForUser() {
    return this.http.get<IGenericResponse<IOrder[]>>(this.BaseURl + 'Orders/GetOrdersForUser');
  }

  getCurrentOrderForUser(id: string) {
    return this.http.get<IGenericResponse<IOrder>>(this.BaseURl + 'Orders/' + id);
  }
 
}
