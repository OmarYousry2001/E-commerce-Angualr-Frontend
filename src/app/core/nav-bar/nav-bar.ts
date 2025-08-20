import { Component } from '@angular/core';
import { BasketService } from '../../basket/BasketService';
import { IBasket } from '../../shared/Models/Basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {
 visible : boolean = false;
   constructor(private basketService: BasketService) {}
  count: Observable<IBasket>;
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    console.log('omar basketId' , basketId)
    if(basketId)
    {
 const id = this.basketService.GetBasket(basketId).subscribe({
      next: (value) => {
        this.count = this.basketService.basket$;
      },
      error(er) {
        console.log(er);
      },
    });
    }
   
  }
  ToggleDropDown() {
    this.visible  = !this.visible ;
  }
 
}
