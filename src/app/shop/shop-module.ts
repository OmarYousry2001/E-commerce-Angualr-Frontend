import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from './shop-item/shop-item';
import { Shop } from './shop';
import { ShopRoutingModule } from './shop-routing-module';
import { SharedModule } from '../shared/shared-module';


@NgModule({
  declarations: [
    ShopItem,
    Shop
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ],
  exports:[Shop]
})
export class ShopModule { }
