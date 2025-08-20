import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

export const authGuard: CanActivateFn = (route, state) => {
  const  _service=inject(HttpClient)
const router=inject(Router)
const baseURL=environment.baseUrl

_service.get(baseURL+"user/IsAuthenticated"  , { withCredentials: true }).subscribe({
  next(value) {
    return true
  },
  error:(err)=> {
    router.navigate(["/account/Login"],{queryParams:{returnUrl:state.url}});
    return false
  },
})

  return true;
};
