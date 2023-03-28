import { Injectable } from "@angular/core";
import { FlashMessageService } from "src/app/infra/services/flashMessage/flash-message.service";
import { RegisterService } from "src/app/infra/services/useCaseService/register.service";
import { RegisterSchema } from "../ports/EntitiesSchemas/RegisterSchema";

/**
 * Register
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterUseCase {

  constructor(
    private registerService: RegisterService,
    private flashMessageService: FlashMessageService
  
  ) {}

  /**
   * Inscription
   */
  execute(registerData: RegisterSchema): void {

    this.registerService.register(registerData).subscribe({
      next: registerResponse=> {        
        this.registerService.updateRegisterStatus(true);
      },
      error: error=> {
        this.flashMessageService.updateFlashMessage(error.error.errorMessage);
      }
    });
  }
}