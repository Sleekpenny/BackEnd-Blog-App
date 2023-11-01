import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginAuthService } from '../service/login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private authService: LoginAuthService){

  }

  onSubmit(form:NgForm){
    const formValue = form.value
    form.reset()

    this.authService.login(formValue.email, formValue.password)
  }
}
