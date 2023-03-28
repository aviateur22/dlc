import { Observable } from "rxjs";
import { UserRepositoryService } from "src/app/infra/services/repositoryService/user-repository.service";
import { LougoutResponseSchema } from "../ports/EntitiesSchemas/LougoutResponseSchema";


/**
 * Logout
 */
export class LogoutUseCase {

  constructor(private userRepositoryService: UserRepositoryService) {}

  /**
   * register
   */
  execute(): Observable<LougoutResponseSchema> {
    return this.userRepositoryService.logout(); 
  }
}