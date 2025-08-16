import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';
import { environment } from '../../../environments/environment.development';
import { BasketService } from '../../basket/BasketService';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.scss'
})
export class ShopItem {
  @Input() Product : IProduct;
    urlImages = environment.urlImages;

      constructor(private _basketService: BasketService) {}

  SetBasketValue() {
     console.log('hereProduct ', this.Product)
    this._basketService.addItemToBasket(this.Product);
   
  }
 
}
