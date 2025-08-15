import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Loading } from '../Services/loading';

@Injectable()
export class loaderInterceptor implements HttpInterceptor {
  constructor(private _service: Loading) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Before send request
    this._service.loading();

    return next.handle(req).pipe(

    // After send request
      finalize(() => {
        this._service.hideLoader();
      })
    );
  }
  }