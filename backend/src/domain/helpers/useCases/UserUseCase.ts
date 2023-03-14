import { AddUserUsecase } from "../../useCases/user/AddUserUsecase";

export class UserUseCase {

  readonly addUserUseCase: AddUserUsecase;

  constructor() {
    
    this.addUserUseCase = new AddUserUsecase();
  }
}