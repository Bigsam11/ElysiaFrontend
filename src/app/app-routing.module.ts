import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  // { path: ' ', pathMatch: 'full', redirectTo: 'login'},
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'forget-password',component: ForgetPasswordComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'dashboard',component: DashboardComponent,canActivate: [AuthGuard]},

  // otherwise redirect to home
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
