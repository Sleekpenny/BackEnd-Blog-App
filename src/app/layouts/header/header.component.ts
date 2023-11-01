import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginAuthService } from 'src/app/service/login-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userEmail:string;
  isLoggedIn$: Observable<boolean>

  constructor(private authService:LoginAuthService){}

  ngOnInit(): void {
    const getEmail  = JSON.parse(localStorage.getItem('user')).email;
    this.userEmail = getEmail
    this.isLoggedIn$ = this.authService.isLoggedIn()
  }

  navBg:any

  @HostListener('document:scroll') scrollover(){
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){

      this.navBg = {
        'background-color' : 'transparent',
        'color' : 'white',        
        'backdrop-filter': 'blur(9px)',
        '-webkit-backdrop-filter' : 'blur(5px)'
      }
    }else {
      this.navBg = {}
    }
  }

  LoggedOut(){
    this.authService.logOut()

  }
}
