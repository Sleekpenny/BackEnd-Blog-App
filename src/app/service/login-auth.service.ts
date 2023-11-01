import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogInGuard: boolean = false

  constructor(private loginAuth:AngularFireAuth, private toaser: ToastrService, private router: Router) { }

  login(email, password){
    this.loginAuth.signInWithEmailAndPassword(email, password).then((docRef)=>{
      this.toaser.success('Login successfully')
      this.router.navigate(['']);
      this.loginUser();
      this.loggedIn.next(true);
      this.isLogInGuard = true

    }).catch((err)=>{
      this.toaser.warning('Invalid credentials')
    })
  }

  loginUser(){
    this.loginAuth.authState.subscribe({
      next: (response)=>{      
        localStorage.setItem('user', JSON.stringify(response))
      }
    })
  }

  logOut(){
    this.loginAuth.signOut().then(()=>{
      this.toaser.success('User logged out');
      this.router.navigate(['/login'])
      this.loggedIn.next(false)
      localStorage.removeItem('user')
      this.isLogInGuard =  false
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
  } 

}
