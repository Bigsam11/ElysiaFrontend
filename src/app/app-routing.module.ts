import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: ' ', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login',component: LoginComponent},
  {path: 'forget-password',component: ForgetPasswordComponent},
  {path: 'register',component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
