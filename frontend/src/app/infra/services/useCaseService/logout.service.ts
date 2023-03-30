import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogoutResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/LogoutResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
 private logoutResponseSchema!: LogoutResponseSchema
 
 // Rxjs
 private logoutResponse = new BehaviorSubject(this.logoutResponseSchema);
 public logoutResponseObservable = this.logoutResponse.asObservable();

 /**
  * Mise a jour 
  * @param {LogoutResponseSchema} logoutResponse 
  */
 updateLogout(logoutResponse: LogoutResponseSchema): void {
   this.logoutResponse.next(logoutResponse);     
 }
}
