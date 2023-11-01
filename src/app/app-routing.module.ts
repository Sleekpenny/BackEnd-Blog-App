import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { LoginComponent } from './login/login.component';
import { authGuard, } from './service/auth-guard.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {path:"", component: DashboardComponent, canActivate: [authGuard]},
  {path: 'category', component: CategoriesComponent,  canActivate: [authGuard]},
  {path: "posts", component:AllPostComponent,  canActivate: [authGuard]},
  {path:'posts/new', component:NewPostComponent,  canActivate: [authGuard] },
  {path: 'login', component: LoginComponent,  },
  {path: 'subscribers', component: SubscribersComponent,   canActivate: [authGuard]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
