import { Component, OnInit } from '@angular/core';
import { BasketService } from '../BasketService';
import { IBasket, IBasketItem } from '../../shared/Models/Basket';
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class Basket implements OnInit {
urlImages = environment.urlImages;
  basket !: IBasket;
  constructor(private _basketService: BasketService) {}

  ngOnInit(): void {
    this._basketService.basket$.subscribe({
      next: (value) => {
        this.basket = value;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

   RemoveBasket(item:IBasketItem){
    this._basketService.removeItemFormBasket(item)
  }
  incrementQuantity(item: IBasketItem) {
    this._basketService.incrementBasketItemQuantity(item);
  }
  DecrementQuantity(item: IBasketItem) {
    this._basketService.DecrementBasketItemQuantity(item);
  }
}
