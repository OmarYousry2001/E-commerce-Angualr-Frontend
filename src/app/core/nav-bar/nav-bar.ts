import { Component, inject } from '@angular/core';
import { BasketService } from '../../basket/BasketService';
import { IBasket } from '../../shared/Models/Basket';
import { Observable } from 'rxjs';
import { CoreService } from '../core-service';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {
 visible : boolean = false;
 userName: string = '';
 isAuthenticated: boolean = false;


   constructor(
    private basketService: BasketService,
    private _coreService: CoreService,
    private router:Router ,
  private _services:HttpClient) {}
  count: Observable<IBasket>;

  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    if(basketId)
    {
       this.basketService.GetBasket(basketId).subscribe({
      next: (value) => {
        this.count = this.basketService.basket$;
      },
      error(er) {
        console.log(er);
      },
    });
    }

     this._coreService.getUserName().subscribe();
    this._coreService.userName$.subscribe(value=>{
     this.userName=value;
    })

// this.isUserAuthenticated();
}

  ToggleDropDown() {
    this.visible  = !this.visible ;
  }

    logout(){ 
    this._coreService.logout().subscribe({
      next:()=>{
        this.router.navigateByUrl('account/Login')
      }
    })
  }


isUserAuthenticated() {
      this._coreService.isUserAuthenticated().subscribe({
      next: (value) => {
        this.isAuthenticated = value;
        console.log('User Authenticated:', this.isAuthenticated); 

      }
   
  });
  }

  
}