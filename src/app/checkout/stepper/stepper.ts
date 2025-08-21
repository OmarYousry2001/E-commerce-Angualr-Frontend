import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  standalone: false,
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss'
})
export class Stepper {
    private _formBuilder = inject(FormBuilder);
    
  Address = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    state: ['', Validators.required],
  });

  DeliveryMethod = this._formBuilder.group({
    delivery: ['', Validators.required],
  });

   PaymentForm=this._formBuilder.group({
    nameOnCard:['',Validators.required]
  })
}
