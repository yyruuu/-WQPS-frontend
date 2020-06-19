import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      console.log("Login Guard", window.localStorage.getItem('userId'));
      if(window.localStorage.getItem('userId')){
        return true;
      }else{
        this.router.navigateByUrl('login')
        return false;
      }
  } 
}