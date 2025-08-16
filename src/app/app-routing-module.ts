import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home-module').then(m => m.HomeModule) },
  { path: 'shop', loadChildren: () => import('./shop/shop-module').then(m => m.ShopModule) },
  { path: 'basket', loadChildren: () => import('./basket/basket-module').then(m => m.BasketModule) },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout-module').then(m => m.CheckoutModule) },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
