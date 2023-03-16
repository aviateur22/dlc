import { AddTodoUseCase } from "../../useCases/AddToDoUseCase"
import { CheckToggleTodoUseCase } from "../../useCases/CheckToggleTodoUseCase";
import { DeleteOneTodoUseCase } from "../../useCases/DeleteOneTodoUseCase";
import { FindAllToDoUseCase } from "../../useCases/FindAllToDoUseCase";
import { FindOneTodoUseCase } from "../../useCases/FindOneTodoUseCase";
import { UpdateTodoUseCase } from "../../useCases/UpdateToDoUseCase";

// UseCase
import { UserUseCase } from "./useCases/UserUseCase";
import { TodoUseCase } from "./useCases/TodoUseCase";
import { ProductUseCase } from "./useCases/ProductUseCase";

/**
 * UseCases disponibles dans le domaine
 */
class UseCases {

  //readonly todoUsecase: TodoUseCase;
  readonly userUsecase: UserUseCase = new UserUseCase();
  readonly productUsecase: ProductUseCase = new ProductUseCase();

  readonly addTodoUseCase: AddTodoUseCase;
  readonly CheckToggleTodoUseCase: CheckToggleTodoUseCase;
  readonly updateTodoUseCase: UpdateTodoUseCase;
  readonly findAllToDoUseCase: FindAllToDoUseCase;
  readonly findOneTodoUseCase: FindOneTodoUseCase;
  readonly deleteOneTodoUseCase: DeleteOneTodoUseCase

  constructor() {
    //this.todoUsecase = new TodoUseCase();
    this.addTodoUseCase = new AddTodoUseCase(this);
    this.CheckToggleTodoUseCase = new CheckToggleTodoUseCase(this);
    this.updateTodoUseCase = new UpdateTodoUseCase(this);
    this.findOneTodoUseCase = new FindOneTodoUseCase(this);
    this.findAllToDoUseCase = new FindAllToDoUseCase(this);
    this.deleteOneTodoUseCase = new DeleteOneTodoUseCase(this);
  }

}
export { UseCases }