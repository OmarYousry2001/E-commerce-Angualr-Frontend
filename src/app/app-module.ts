import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ShopModule } from './shop/shop-module';
import { CoreModule } from './core/core-module';
import { SharedModule } from './shared/shared-module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ShopModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
      provideHttpClient()

  ],
  bootstrap: [App]
})
export class AppModule { }
