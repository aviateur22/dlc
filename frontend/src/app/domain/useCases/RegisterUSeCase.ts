import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserRepositoryService } from "src/app/infra/services/repositoryService/user-repository.service";
import { RegisterResponseSchema } from "../ports/EntitiesSchemas/RegisterResponseSchema";
import { RegisterSchema } from "../ports/EntitiesSchemas/RegisterSchema";

/**
 * Register
 */
export class RegisterService {

  constructor(private userRepositoryService: UserRepositoryService) {}

  /**
   * register
   */
  execute(registerData: RegisterSchema): Observable<RegisterResponseSchema> {
    return this.userRepositoryService.login(registerData); 
  }
}