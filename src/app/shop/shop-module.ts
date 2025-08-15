import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from './shop-item/shop-item';
import { Shop } from './shop';
import { ShopRoutingModule } from './shop-routing-module';
import { SharedModule } from '../shared/shared-module';
import { ProductDetails } from './product-details/product-details';
import { NgxImageZoomModule } from 'ngx-image-zoom';


@NgModule({
  declarations: [
    ShopItem,
    Shop,
    ProductDetails
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    NgxImageZoomModule
  ],
  exports:[Shop]
})
export class ShopModule { }
