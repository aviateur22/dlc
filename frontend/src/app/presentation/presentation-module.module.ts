// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Custom
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotAuthorizeComponent } from './not-authorize/not-authorize.component';
import { RegisterComponent } from './register/register.component';
import { InputComponent } from './components/input/input.component';
import { RoundButtonComponent } from './components/round-button/round-button.component';
import { RectangleButtonComponent } from './components/rectangle-button/rectangle-button.component';
import { NotFindComponent } from './not-find/not-find.component';
import { ProductListComponent } from './home/product-list/product-list.component';
import { ProductComponent } from './home/product/product.component';


@NgModule({
  declarations: [
    InputComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotAuthorizeComponent,    
    RoundButtonComponent, 
    RectangleButtonComponent, 
    NotFindComponent, 
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[]
})
export class PresentationModule { }
