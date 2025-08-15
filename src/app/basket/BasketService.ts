import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, retry } from 'rxjs';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotal,
} from '../shared/Models/Basket';
import { IGenericResponse, IProduct } from '../shared/Models/Product';
import { IDelivery } from '../shared/Models/Delivery';
import { NIL } from 'uuid';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  BaseURL = environment.baseUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null); // for get Leasts Updates
  basket$ = this.basketSource.asObservable(); // for encapsulation – exposes read-only observable
  private basketSourceTotal = new BehaviorSubject<IBasketTotal | null>(null);
  basketTotal$ = this.basketSourceTotal.asObservable();

  constructor(private http: HttpClient) {}
  shipPrice: number = 0;


  GetBasket(id: string) {
    // here publish
    return this.http.get(this.BaseURL + 'Basket/' + id).pipe(
      map((value:IGenericResponse<IBasket> ) => {
        // Fire
        this.basketSource.next(value.data);
        // this.calculateTotal();
        return value;
      })
    );
  }
  SetBasket(basket: IBasket) {
    // هنا انا بستخدم سبسكريبر عشان عايز اتعامل مباشر مع النتيجه واحد البهفيور سبجكت

    return this.http
      .post(this.BaseURL + 'Basket/Update', basket)
      .subscribe({
        next: (value: IGenericResponse<IBasket>) => {
          this.basketSource.next(value.data);
          // this.calculateTotal();
          console.log(value);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  getCurrentValue() {
    return this.basketSource.value;
  }

  addItemToBasket(product: IProduct, quantity: number = 1) {

    // mapping

    const itemToAdd = this.mapProductToBasketItem(product, quantity);

    let basket = this.getCurrentValue();

    if (basket === null) {
      basket = this.CreateBasket();
    }


    basket.basketItems = this.AddOrUpdate(
      basket.basketItems,
      itemToAdd,
      quantity
    );
    
    return this.SetBasket(basket);
  }
  private AddOrUpdate(
    basketItem: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ) {

    const index = basketItem.findIndex((x) => x.id === itemToAdd.id);
    // not founded in index
    if (index === -1) {
      itemToAdd.quantity = quantity;
      basketItem.push(itemToAdd);
    } else {
      basketItem[index].quantity += quantity;
    }
    return basketItem;
  }

  CreateBasket(): IBasket {
         
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }
  mapProductToBasketItem(product: IProduct, quantity: number): IBasketItem {
    return {
      id: product.id,
      category: product.categoryName,
      image: product.photos[0].imageName,
      name: product.name,
      price: product.newPrice,
      quantity: quantity,
      description: product.description,
    };
  }

  /**
   * Increments the quantity of a specific item in the basket by 1.
   */
  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentValue();
    const itemIndex = basket.basketItems.findIndex((i) => i.id === item.id);
    basket.basketItems[itemIndex].quantity++;
    this.SetBasket(basket);
  }
 

  /**
   * Decrements the quantity of a specific item in the basket by 1.
   * If the quantity becomes 0, removes the item from the basket.
   */
  DecrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentValue();
    const itemIndex = basket.basketItems.findIndex((i) => i.id === item.id);
    if (basket.basketItems[itemIndex].quantity > 1) {
      basket.basketItems[itemIndex].quantity--;
      this.SetBasket(basket);
    } else {
      this.removeItemFormBasket(item);
    }
  }

  /**
   * Removes an item from the basket
   * If the basket becomes empty, deletes the basket.
   */
  removeItemFormBasket(item: IBasketItem) {
    const basket = this.getCurrentValue();
    // Some --> if condition was true for at least one element  
    if (basket.basketItems.some((i) => i.id === item.id)) {
      basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.SetBasket(basket);
      } else {
        this.deleteBasketItem(basket);
      }
    }
  }

  /**
   * Sends a request to delete the entire basket from the server.
   * Clears local basket data and localStorage on success.
   */
  deleteBasketItem(basket: IBasket) {
    return this.http
      .delete(this.BaseURL + 'Basket/' + basket.id)
      .subscribe({
        next: (value) => {
          this.basketSource.next(null);
          localStorage.removeItem('basketId');
        },
        error(err) {
          console.log(err);
        },
      });
  }

  deleteBasket() {
    var basket: IBasket;
    this.basketSource.next(basket);
    this.basketSourceTotal.next(null);
    localStorage.removeItem('basketId');
  }

    CreatePaymentIntent(deliveryMethodId: number = 3)  {
    
    console.log(this.getCurrentValue()?.id);
    return this.http
      .post<IBasket>(
        this.BaseURL +
          `Payments/Create?basketId=${
            this.getCurrentValue()?.id
          }&deliveryId=${deliveryMethodId}`,
        {}
      )
      .pipe(
        map((value: IBasket) => {
          this.basketSource.next(value);
          console.log('test:', value);
        })
      );
  }

    SetShippingPrice(delivery: IDelivery) {
    this.shipPrice = delivery.price;
    this.calculateTotal();
  }
  /**
   * Calculates the basket summary including:
   *  Subtotal: total price of all basket items.
   *  Shipping: fixed shipping cost (currently set to 1).
   *  Total: sum of subtotal and shipping.
   */
  calculateTotal() {

    const basket = this.getCurrentValue();
        if (!basket) return;
    const shipping = this.shipPrice;
    const subtotal = basket.basketItems.reduce((a, c) => {
      return c.price * c.quantity + a ;
    }, 0);
    const total = shipping + subtotal;
    this.basketSourceTotal.next({ shipping, subtotal, total });
  }
}
