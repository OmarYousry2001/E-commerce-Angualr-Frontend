import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { IGenericResponse } from '../shared/Models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _httpClient:HttpClient){}
  baseURL = environment.baseUrl;
  private name =new BehaviorSubject<string>(null);
  userName$ = this.name.asObservable();

  logout(){
    return this._httpClient.get(this.baseURL + 'Authentication/Logout').pipe(
      map(() =>{
        this.name.next(null); 
      })
    );
  }

    getUserName() {
  return this._httpClient.get<IGenericResponse<string>>(this.baseURL + 'User/GetUserName').pipe(
    map((value) => {
      this.name.next(value.data);
    })
  );
}
isUserAuthenticated() {
  return this._httpClient.get(this.baseURL + "user/IsAuthenticated", {
    withCredentials: true,
    observe: 'response'  
  }).pipe(
    map(response => {
      return response.status === 200; 
    }),
  
  );
}

 setUserName(name: string) {
    this.name.next(name);
  }


  }

