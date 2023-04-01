// Core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom
import url from './domain/utils/url';
import { AuthGuard } from './infra/services/auth/auth.guard';
import { LoginGuard } from './infra/services/auth/login.guard';
import { AddProductComponent } from './presentation/pages/add-product-page/add-product.component';
import { HomeComponent } from './presentation/pages/user-home-page/home.component';
import { LoginComponent } from './presentation/pages/login-page/login.component';
import { NotAuthorizeComponent } from './presentation/pages/not-authorize-page/not-authorize.component';
import { NotFindComponent } from './presentation/pages/not-find-page/not-find.component';
import { RegisterComponent } from './presentation/pages/register-page/register.component';
import { AboutComponent } from './presentation/pages/about-page/about.component';
import { FriendComponent } from './presentation/pages/friend-page/friend.component';

const routes: Routes = [  
  { path: url.login, component: LoginComponent, title: 'DLC | Connexion', canActivate: [LoginGuard] },
  { path: url.register, component: RegisterComponent, title: 'DLC | Inscription' },
  { path: url.userProducts, component: HomeComponent, title: 'DLC | Home', canActivate: [AuthGuard] },
  { path: url.addProduct, component: AddProductComponent, title: 'DLC | Nouveau produit', canActivate: [AuthGuard] },
  { path: url.userAccount, component: AboutComponent, title: 'DLC | Espace utilisateur', canActivate: [AuthGuard] },
  { path: url.friend, component: FriendComponent, title: 'DLC | Ajout ami', canActivate: [AuthGuard] },
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
