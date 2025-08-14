import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment.development';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App   {

//   constructor(private httpClient: HttpClient) {}
// category:any;
//   getCateGory()
//   {
//     this.httpClient.get(environment.baseUrl+'Category/GetAll').subscribe({
//       next:(value:any) =>{
//         this.category = value
//         console.log(this.category);
//       }
//     })
//   }
  
//   ngOnInit(): void {
//    this.getCateGory();
//   }

  protected title = 'E-commerce-Angular-Frontend';
}
