import { FindUserUseCase } from "../../../useCases/user/FindUserUseCase";
import { LoginUserUseCase } from "../../../useCases/user/LoginUserUseCase";
import { LogoutUserUseCase } from "../../../useCases/user/LogoutUserUseCase";
import { RegisterUserUseCase } from "../../../useCases/user/RegisterUserUseCase";
/**
 * UseCase pour User
 */
export class UserUseCase {

  readonly registerUserUseCase: RegisterUserUseCase = new RegisterUserUseCase();
  readonly loginUserUseCase: LoginUserUseCase = new LoginUserUseCase();
  readonly findUserUseCase: FindUserUseCase = new FindUserUseCase(); 
  readonly logoutUserUseCase: LogoutUserUseCase = new LogoutUserUseCase();
}