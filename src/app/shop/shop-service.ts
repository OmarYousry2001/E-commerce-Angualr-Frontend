import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGenericResponse, IProduct } from '../shared/Models/Product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BaseSearchCriteriaModel } from '../shared/Models/ProductParam';
import { OrderingEnum } from '../shared/Models/OrderingEnum';
import { IPaginatedResult } from '../shared/Models/PaginatedResult';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
    constructor(private http: HttpClient) {}

    getProduct(criteria: BaseSearchCriteriaModel) {
  let param = new HttpParams();

  if (criteria.categoryId) {
    param = param.append('categoryId', criteria.categoryId);
  }
  if (criteria.orderingEnum !== null && criteria.orderingEnum !== undefined) {
    param = param.append('orderingEnum', OrderingEnum[criteria.orderingEnum!]);
  }
  if (criteria.searchTerm) {
    param = param.append('searchTerm', criteria.searchTerm);
  }

  param = param.append('pageSize', criteria.pageSize);
  param = param.append('pageNumber', criteria.pageNumber);

  return this.http.get<IPaginatedResult<IProduct>>(environment.baseUrl + 'Product/PaginatedList', {
    params: param,
  });
}


      getCategory(): Observable<IGenericResponse> {
    return this.http.get<IGenericResponse>(environment.baseUrl+ 'Category/GetAll');
  }
  
}
