import { Injectable } from "@angular/core";
import { FlashMessageService } from "src/app/infra/services/flashMessage/flash-message.service";
import { UserRepositoryService } from "src/app/infra/services/repositoryService/user-repository.service";
import { LogoutService } from "src/app/infra/services/useCaseService/logout.service";



/**
 * Logout
 */
@Injectable({
  providedIn: 'root'
})
export class LogoutUseCase {

  constructor(private userService: UserRepositoryService, private flashService: FlashMessageService, private logoutService: LogoutService) {}

  /**
   * Logout
   */
  execute() {
    this.userService.logout().subscribe({
      next: logoutResponse=>{
        this.flashService.updateFlashMessage(logoutResponse.message);
        this.logoutService.updateLogout(logoutResponse);
      }
    }); 
  }
}