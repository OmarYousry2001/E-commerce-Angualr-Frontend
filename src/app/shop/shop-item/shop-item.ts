import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.scss'
})
export class ShopItem {
  @Input() Product !: IProduct;
    urlImages = environment.urlImages;
  
}
