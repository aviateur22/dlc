import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserRepositoryService } from './services/repositoryService/user-repository.service';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    HttpClientModule    
  ],
  providers: [
    UserRepositoryService
  ]
})
export class InfraModule { }
