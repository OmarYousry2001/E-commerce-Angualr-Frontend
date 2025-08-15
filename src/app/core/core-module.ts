import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar';
import { RouterLink, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    NavBar
  ],
  imports: [
     CommonModule,
     RouterLink,
     RouterModule,
     BrowserAnimationsModule,
     MatBadgeModule
  ],
  exports:[NavBar]
})
export class CoreModule { }
