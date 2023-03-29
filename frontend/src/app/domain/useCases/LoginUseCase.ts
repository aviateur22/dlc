import { Injectable } from "@angular/core";
import { FlashMessageService } from "src/app/infra/services/flashMessage/flash-message.service";
import { UserRepositoryService } from "src/app/infra/services/repositoryService/user-repository.service";
import { LoginService } from "src/app/infra/services/useCaseService/login.service";
import { LoginSchema } from "../ports/EntitiesSchemas/LoginSchema";

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase { 
 
  constructor(
    private userService: UserRepositoryService, 
    private loginService: LoginService,
    private flashService: FlashMessageService
  ) { }

  /**
   * login user
   */
  execute(loginData: LoginSchema): void {
    this.userService.login(loginData).subscribe({

      next: LoginResponse => {
        this.loginService.updateLogin(LoginResponse);
        localStorage.setItem('token', LoginResponse.token);
        localStorage.setItem('user', JSON.stringify(LoginResponse.user))
      },

      error: error =>{
        localStorage.clear();
        this.flashService.updateFlashMessage(error.error.errorMessage);
      }
    })
  }
}
