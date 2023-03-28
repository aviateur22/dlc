import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsecaseServiceProviderService } from './provider/usecase-service-provider.service';
import { UserRepositoryService } from './services/repositoryService/user-repository.service';




@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    HttpClientModule    
  ],
  providers: [
    UsecaseServiceProviderService, 
    UserRepositoryService
  ]
})
export class InfraModule { }
