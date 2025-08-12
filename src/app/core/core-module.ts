import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    NavBar
  ],
  imports: [
     CommonModule,
     RouterLink
  ],
  exports:[NavBar]
})
export class CoreModule { }
