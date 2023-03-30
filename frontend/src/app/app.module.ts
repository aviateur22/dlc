// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


// Custom

import { InfraModule } from './infra/infra.module';
import { FlashMessageComponent } from './presentation/flash-message/flash-message.component';
import { HeadersHttpInterceptor } from './infra/services/interceptor/http.interceptor';
import { LogoutComponent } from './presentation/logout/logout.component';
import { InputComponent } from './presentation/components/input/input.component';
import { RectangleButtonComponent } from './presentation/components/rectangle-button/rectangle-button.component';
import { RoundButtonComponent } from './presentation/components/round-button/round-button.component';
import { HomeComponent } from './presentation/home/home.component';
import { ProductListComponent } from './presentation/home/product-list/product-list.component';
import { ProductComponent } from './presentation/home/product/product.component';
import { LoginComponent } from './presentation/login/login.component';
import { NotAuthorizeComponent } from './presentation/not-authorize/not-authorize.component';
import { NotFindComponent } from './presentation/not-find/not-find.component';
import { RegisterComponent } from './presentation/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './presentation/add-product/add-product.component';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotAuthorizeComponent,    
    RoundButtonComponent, 
    RectangleButtonComponent, 
    NotFindComponent, 
    ProductListComponent,
    ProductComponent,
    FlashMessageComponent,
    LogoutComponent,
    AddProductComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfraModule     
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: HeadersHttpInterceptor, 
    multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
