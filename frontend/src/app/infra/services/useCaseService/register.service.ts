import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/RegisterResponseSchema';
import { RegisterSchema } from 'src/app/domain/ports/EntitiesSchemas/RegisterSchema';
import { UserSchema } from 'src/app/domain/ports/EntitiesSchemas/UserSchema';
import { UserRepositoryService } from '../repositoryService/user-repository.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Service Register
 */
export class RegisterService {

  // Schema de la réponse
  private registerResponseSchema!: RegisterResponseSchema;

  // Rxjs
  private registerResponse = new BehaviorSubject(this.registerResponseSchema);
  public registerResponseObservable = this.registerResponse.asObservable();

  constructor(private userSerice: UserRepositoryService) { }

  /**
   * Modification statut Inscription
   * @param registerStatus 
   */
  updateRegisterStatus(registerResponse: RegisterResponseSchema): void {
    this.registerResponse.next(registerResponse); 
  }

  /**
   * Inscription client
   */
  register(registerData: RegisterSchema): Observable<RegisterResponseSchema> {
    return this.userSerice.register(registerData)
  }
}
