import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Register } from './register/register';
import { Active } from './active/active';
import { Login } from './login/login';

const routes: Routes = [

  {path:'' ,component: Register},  
  {path:'Active' ,component: Active},  
  {path:'Login' ,component: Login},  


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
