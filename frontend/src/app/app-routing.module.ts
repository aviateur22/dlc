import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './infra/services/auth/auth.guard';
import { HomeComponent } from './presentation/home/home.component';
import { LoginComponent } from './presentation/login/login.component';
import { NotAuthorizeComponent } from './presentation/not-authorize/not-authorize.component';
import { RegisterComponent } from './presentation/register/register.component';

const routes: Routes = [  
  { path: 'login', component: LoginComponent, title: 'Connexion à DLC' },
  { path: 'register', component: RegisterComponent, title: 'Inscription à DLC' },
  { path: 'home', component: HomeComponent, title: 'DLC', canActivate: [AuthGuard] },
  { path: "403", component: NotAuthorizeComponent , title: 'DLC'},
  { path: '', redirectTo: '/login',  pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
