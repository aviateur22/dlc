import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './infra/services/auth/auth.guard';
import { LoginGuard } from './infra/services/auth/login.guard';
import { HomeComponent } from './presentation/home/home.component';
import { LoginComponent } from './presentation/login/login.component';
import { NotAuthorizeComponent } from './presentation/not-authorize/not-authorize.component';
import { NotFindComponent } from './presentation/not-find/not-find.component';
import { RegisterComponent } from './presentation/register/register.component';

const routes: Routes = [  
  { path: 'login', component: LoginComponent, title: 'Connexion à DLC', canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, title: 'Inscription à DLC' },
  { path: 'home', component: HomeComponent, title: 'DLC', canActivate: [AuthGuard] },
  { path: "403", component: NotAuthorizeComponent , title: 'DLC'},
  { path: "404", component: NotFindComponent , title: 'DLC'},
  { path: "", redirectTo: '/login',  pathMatch:'full'},
  { path: '**', redirectTo: '/404',  pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
