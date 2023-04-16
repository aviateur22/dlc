import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/LoginResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Schema LoginResponse
  private loginResponseschema!: LoginResponseSchema;

  // Rxjs
  private loginResponse = new BehaviorSubject(this.loginResponseschema);
  public loginResponseObservable = this.loginResponse.asObservable();

  /**
   * Mise a jour 
   * @param {LoginResponseSchema} loginResponse 
   */
  updateLogin(loginResponse: LoginResponseSchema): void {
    this.loginResponse.next(loginResponse);     
  }
}
