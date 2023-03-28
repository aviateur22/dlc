import { Injectable } from "@angular/core";
import { LoginService } from "src/app/infra/services/useCaseService/login.service";
import { LoginSchema } from "../ports/EntitiesSchemas/LoginSchema";

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  //private userService: UserRepositoryService = this.usecaseProvider.getUseCase(UserRepositoryService)

  constructor(private loginService: LoginService) { }

  /**
   * login user
   */
  execute(loginData: LoginSchema): void {

    // Validation Inscription
    this.loginService.isLoginSuccessObservable.subscribe(loginStatus=>{
      if(loginStatus) {
        console.log(loginStatus);
      }
    });

    this.loginService.login(loginData);
  }
}