import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './infra/services/auth/auth.guard';
import { LoginGuard } from './infra/services/auth/login.guard';
import { AddProductComponent } from './presentation/add-product/add-product.component';
import { HomeComponent } from './presentation/home/home.component';
import { LoginComponent } from './presentation/login/login.component';
import { NotAuthorizeComponent } from './presentation/not-authorize/not-authorize.component';
import { NotFindComponent } from './presentation/not-find/not-find.component';
import { RegisterComponent } from './presentation/register/register.component';

const routes: Routes = [  
  { path: 'login', component: LoginComponent, title: 'DLC | Connexion', canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, title: 'DLC | Inscription' },
  { path: 'home', component: HomeComponent, title: 'DLC | Home', canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, title: 'DLC | Nouveau produit', canActivate: [AuthGuard] },
  { path: "403", component: NotAuthorizeComponent , title: 'DLC | Interdit'},
  { path: "404", component: NotFindComponent , title: 'DLC | Inconnu '},
  { path: "", redirectTo: '/login',  pathMatch:'full'},
  { path: '**', redirectTo: '/404',  pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
