// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Custom

import { InfraModule } from './infra/infra.module';
import { PresentationModule } from './presentation/presentation-module.module';
import { FlashMessageComponent } from './presentation/flash-message/flash-message.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
