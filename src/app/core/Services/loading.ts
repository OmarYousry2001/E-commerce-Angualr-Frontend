import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class Loading {
    RequestCount = 0;
  constructor(private _service: NgxSpinnerService) {}

  // Loading
    loading() {
    this.RequestCount++;

    this._service.show(undefined, {
      bdColor: 'rgba(0, 0, 0, 0.8)',
      size: 'large',
      color: '#fff',
      type: 'square-jelly-box',
      fullScreen: true,
    });
  }
    // HideLoader
  hideLoader() {
    this.RequestCount--;
    if (this.RequestCount <= 0) {
      this.RequestCount = 0;
      this._service.hide();
    }
  }
}
