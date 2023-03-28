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

  private isRegisterSuccess = new BehaviorSubject(false);
  public isRegisterSuccessObservable = this.isRegisterSuccess.asObservable();

  constructor(private userSerice: UserRepositoryService) { }

  /**
   * Modification statut Inscription
   * @param registerStatus 
   */
  updateRegisterStatus(registerStatus: boolean): void {
    this.isRegisterSuccess.next(registerStatus); 
  }

  /**
   * Inscription client
   */
  register(registerData: RegisterSchema): Observable<UserSchema> {
    return this.userSerice.register(registerData)
  }
}
