
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from './login-auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {

    constructor (private authService:LoginAuthService, private router: Router, private toastr: ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>  | Promise<boolean | UrlTree> | boolean | UrlTree{
      
      if(this.authService.isLogInGuard){
        return true
      }else {
        this.router.navigate(['/login']);
        this.toastr.warning('Create an account before accessing this page')
        return false
      }
    }
  }