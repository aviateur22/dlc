import { Observable } from "rxjs";
import { UserRepositoryService } from "src/app/infra/services/repositoryService/user-repository.service";
import { UsecaseService } from "src/app/infra/services/useCaseService/usecase.service";
import { LoginResponseSchema } from "../ports/EntitiesSchemas/LoginResponseSchema";
import { LoginSchema } from "../ports/EntitiesSchemas/LoginSchema";
import { UserProductsUseCase } from "./UserProductsUseCase";

/**
 * Login
 */
export class LoginUseCase {

  constructor(private userRepositoryService: UserRepositoryService, private userProductUseCase: UserProductsUseCase) {}

  /**
   * login user
   */
  execute(loginData: LoginSchema): Observable<LoginResponseSchema> {   
    this.userProductUseCase.execute()
    return this.userRepositoryService.login(loginData);    
  }
}