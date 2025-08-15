import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'shop', loadChildren: () => import('./shop/shop-module').then(m => m.ShopModule) },
  { path: 'basket', loadChildren: () => import('./basket/basket-module').then(m => m.BasketModule) },
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
