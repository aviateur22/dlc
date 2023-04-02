// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


// Custom

import { InfraModule } from './infra/infra.module';
import { FlashMessageComponent } from './presentation/components/flash-message/flash-message.component';
import { HeadersHttpInterceptor } from './infra/services/interceptor/http.interceptor';
import { UserOptionComponent } from './presentation/components/user-option/user-option.component';
import { InputComponent } from './presentation/components/input/input.component';
import { RectangleButtonComponent } from './presentation/components/rectangle-button/rectangle-button.component';
import { RoundButtonComponent } from './presentation/components/round-button/round-button.component';
import { HomeComponent } from './presentation/pages/user-home-page/home.component';
import { ProductListComponent } from './presentation/pages/user-home-page/product-list/product-list.component';
import { ProductComponent } from './presentation/pages/user-home-page/product/product.component';
import { LoginComponent } from './presentation/pages/login-page/login.component';
import { NotAuthorizeComponent } from './presentation/pages/not-authorize-page/not-authorize.component';
import { NotFindComponent } from './presentation/pages/not-find-page/not-find.component';
import { RegisterComponent } from './presentation/pages/register-page/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './presentation/pages/add-product-page/add-product.component';
import { HeaderComponent } from './presentation/components/header/header.component';
import { DeleteModalComponent } from './presentation/pages/user-home-page/delete-modal/delete-modal.component';
import { AboutComponent } from './presentation/pages/about-page/about.component';
import { FriendComponent } from './presentation/pages/friend-page/friend.component';
import { FriendDisplayComponent } from './presentation/pages/friend-page/friend/friend-display.component';
import { AddFriendComponent } from './presentation/pages/friend-page/add-friend/add-friend.component';
import { FriendListComponent } from './presentation/pages/friend-page/friend-list/friend-list.component';
import { NewFriendsRelationModalComponent } from './presentation/pages/friend-page/new-friends-relation-modal/new-friends-relation-modal.component';
import { YesNoButtonComponent } from './presentation/components/yes-no-button/yes-no-button.component';
import { HeaderPageComponent } from './presentation/components/header-page/header-page.component';
import { NewFriendRelationComponent } from './presentation/pages/friend-page/new-friends-relation-modal/friend-relation/friend-relation.component';
import { NewFriendListComponent } from './presentation/pages/friend-page/new-friends-relation-modal/new-friend-list/new-friend-list.component';


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
    UserOptionComponent,
    AddProductComponent,
    HeaderComponent,
    DeleteModalComponent,
    AboutComponent,
    FriendComponent,
    FriendDisplayComponent,
    AddFriendComponent,
    FriendListComponent,
    NewFriendsRelationModalComponent,
    YesNoButtonComponent,
    HeaderPageComponent,
    NewFriendRelationComponent,
    NewFriendListComponent
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
