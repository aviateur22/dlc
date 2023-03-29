// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


// Custom

import { InfraModule } from './infra/infra.module';
import { PresentationModule } from './presentation/presentation-module.module';
import { FlashMessageComponent } from './presentation/flash-message/flash-message.component';
import { HeadersHttpInterceptor } from './infra/services/interceptor/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FlashMessageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    InfraModule,
    PresentationModule     
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: HeadersHttpInterceptor, 
    multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
