import { Injectable } from "@angular/core";
import { FlashMessageService } from "src/app/infra/services/flashMessage/flash-message.service";
import { UserRepositoryService } from "src/app/infra/services/repositoryService/user-repository.service";
import { LoginService } from "src/app/infra/services/useCaseService/login.service";
import localStorage from "../helpers/localStorage";
import { LoginSchema } from "../ports/EntitiesSchemas/LoginSchema";

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase { 
 
  constructor(
    private userService: UserRepositoryService, 
    private loginService: LoginService
    
  ) { }

  /**
   * login user
   */
  execute(loginData: LoginSchema): void {
    this.userService.login(loginData).subscribe({

      next: LoginResponse => {
        this.loginService.updateLogin(LoginResponse);

        // Localstorage
        localStorage.loginData({
          token: LoginResponse.token,
          user: JSON.stringify(LoginResponse.user)
        });
      }
    })
  }
}
