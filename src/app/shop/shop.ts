import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/Models/Product';
import { ICategory } from '../shared/Models/Category';
import { BaseSearchCriteriaModel } from '../shared/Models/ProductParam';
import { ShopService } from './shop-service';
import { IPaginatedResult } from '../shared/Models/PaginatedResult';
import { OrderingEnum } from '../shared/Models/OrderingEnum';


@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.html',
  styleUrl: './shop.scss'
})
export class Shop implements OnInit  {
    product!: IProduct[];
     Category!: ICategory[];
       TotalCount: number=0;
  ProductParam = new BaseSearchCriteriaModel();

  constructor(private _shopService: ShopService
   
  ) {}

    ngOnInit(): void {
    this.getAllProduct();
    this.getCategory();
  }
  getAllProduct() {
    this._shopService.getProduct(this.ProductParam).subscribe({
      next: (value: IPaginatedResult<IProduct>) => {
        this.product = value.data;
        this.TotalCount = value.totalCount;
        this.ProductParam.pageNumber = value.currentPage;
        this.ProductParam.pageSize = value.pageSize;
      },
      error:(er) =>
      {
        console.log(er);
      }
    });
  }

 getCategory() {
    this._shopService.getCategory().subscribe({
      next: (value) => {
        this.Category = value.data;
      },
        error:(er) =>
      {
        console.log(er);
      }
    });
  }

SortingByPrice(sort: Event) {
  const value = Number((sort.target as HTMLSelectElement).value);
  this.ProductParam.orderingEnum = value !== 0 ? value as OrderingEnum : null;
  this.getAllProduct();
}

 SortingOption = [
  { name: 'Price', value: 0 }, 
  { name: 'Price:min-max', value: OrderingEnum.PriceAce },
  { name: 'Price:max-min', value: OrderingEnum.PriceDce },
];

 SelectedId(categoryId: string | null) {
    this.ProductParam.categoryId = categoryId;
    this.ProductParam.pageNumber = 1;
    this.getAllProduct();
  }

    OnSearch(Search: string) {
    this.ProductParam.searchTerm = Search;
    this.getAllProduct();
  }
  @ViewChild('search') searchInput!: ElementRef; // Reference to the search input element
  @ViewChild('SortSelected') selected!: ElementRef; // Reference to the sorting select element

   // Reset all values
  ResetValue() {
    this.ProductParam.searchTerm = '';
    this.ProductParam.orderingEnum = null;
    this.ProductParam.categoryId = null;
    this.ProductParam.pageNumber=1;
    this.getAllProduct();

    this.searchInput.nativeElement.value = '';

    this.selected.nativeElement.selectedIndex = 0;
      
  }

    OnChangePage(page: any) {
    this.ProductParam.pageNumber = page;
    this.getAllProduct();
  }

}
