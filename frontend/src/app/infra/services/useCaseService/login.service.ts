import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginSchema } from 'src/app/domain/ports/EntitiesSchemas/LoginSchema';
import { FlashMessageService } from '../flashMessage/flash-message.service';
import { UserRepositoryService } from '../repositoryService/user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private serviceLoginSuccess = new BehaviorSubject(false);
  public isLoginSuccessObservable = this.serviceLoginSuccess.asObservable();

  constructor(
    private flashMessageService: FlashMessageService,
    private userService: UserRepositoryService
    ) { }

  // Vérification du login
  updateLogin(loginStatus: boolean): void {
    this.serviceLoginSuccess.next(loginStatus);     
  }

  /**
   * Connexion client
   */
  login(loginData: LoginSchema) {
    this.userService.login(loginData).subscribe({

      next: LoginResponse => {
        this.updateLogin(true);

      },

      error: error =>{
        this.flashMessageService.updateFlashMessage(error.error.errorMessage);
      }

    })
  }
}
