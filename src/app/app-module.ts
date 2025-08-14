import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ShopModule } from './shop/shop-module';
import { CoreModule } from './core/core-module';
import { SharedModule } from './shared/shared-module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ShopModule,
    CoreModule,
    SharedModule,
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-top-right',
      countDuplicates: true,
      timeOut: 1500,
      progressBar: true,
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
      provideHttpClient()

  ],
  bootstrap: [App]
})
export class AppModule { }
