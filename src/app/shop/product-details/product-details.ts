// import { Component, OnInit } from '@angular/core';
// import { ShopService } from '../shop-service';
// import { ActivatedRoute } from '@angular/router';
// import { IProduct } from '../../shared/Models/Product';
// import { ToastrService } from 'ngx-toastr';
// import { BasketService } from '../../basket/BasketService';

// @Component({
//   selector: 'app-product-details',
//   standalone: false,
//   templateUrl: './product-details.html',
//   styleUrl: './product-details.scss',
// })
// export class ProductDetails implements OnInit {
//   qunatity: number = 1;
//   loading: boolean = false;
//   product!: IProduct;
//   MainImage: string;
//   constructor(
//     private shopService: ShopService,
//     private activatedRoute: ActivatedRoute,
//     private toast: ToastrService,
//     private basketService: BasketService
//   ) {}
//   ngOnInit(): void {
//     this.loadProduct();
//   }
//   loadProduct() {
//     const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
//     this.shopService.getProductDetails(id).subscribe({
//       next: (vlaue) => {
//         this.product = vlaue;
//         this.MainImage = this.product.photos[0].imageName;
//       },
//     });
//   }
//   ReplaceImage(src: string) {
//     this.MainImage = src;
//   }
//   incrementBasket() {
//     if (this.qunatity < 10) {
//       this.qunatity++;
//       this.toast.success('item has been added to the basket', 'SUCCESS');
//     } else {
//       this.toast.warning("You can't add more than 10 items", 'Enough');
//     }
//   }

//   DecrementBasket() {
//     if (this.qunatity > 1) {
//       this.qunatity--;
//       this.toast.warning('item has been Decrement', 'SUCCESS');
//     } else {
//       this.toast.error("You can't Decrement more than 1 items", 'ERROR');
//     }
//   }
//   AddToBasket() {
//     this.basketService.addItemToBasket(this.product, this.qunatity);
//     this.toast.success('item has been added to basket', 'SUCCESS');
//   }
//   CalucateDiscount(oldPrice: number, newPrice: number): number {
//     return parseFloat(
//       Math.round(((oldPrice - newPrice) / oldPrice) * 100).toFixed(1)
//     );
//   }

//   // showReview(id: number) {
//   //   this.loading = true;
//   //   this.shopService.getProductRating(id).subscribe({
//   //     next: (res) => {
//   //       this.loading = false;
//   //       this.reviews = res;
//   //     },
//   //     error(err) {
//   //       console.log(err);
//   //     },
//   //   });
//   // }
// }
