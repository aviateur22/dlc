import { AddTodoUseCase } from "../../useCases/AddToDoUseCase"
import { CheckToggleTodoUseCase } from "../../useCases/CheckToggleTodoUseCase";
import { DeleteOneTodoUseCase } from "../../useCases/DeleteOneTodoUseCase";
import { FindAllToDoUseCase } from "../../useCases/FindAllToDoUseCase";
import { FindOneTodoUseCase } from "../../useCases/FindOneTodoUseCase";
import { UpdateTodoUseCase } from "../../useCases/UpdateToDoUseCase";

/**
 * UseCases disponibles dans le domaine
 */
class UseCases {

  
  readonly addTodoUseCase: AddTodoUseCase;
  readonly CheckToggleTodoUseCase: CheckToggleTodoUseCase;
  readonly updateTodoUseCase: UpdateTodoUseCase;
  readonly findAllToDoUseCase: FindAllToDoUseCase;
  readonly findOneTodoUseCase: FindOneTodoUseCase;
  readonly deleteOneTodoUseCase: DeleteOneTodoUseCase

  constructor() {
    this.addTodoUseCase = new AddTodoUseCase(this);
    this.CheckToggleTodoUseCase = new CheckToggleTodoUseCase(this);
    this.updateTodoUseCase = new UpdateTodoUseCase(this);
    this.findOneTodoUseCase = new FindOneTodoUseCase(this);
    this.findAllToDoUseCase = new FindAllToDoUseCase(this);
    this.deleteOneTodoUseCase = new DeleteOneTodoUseCase(this);
  }

}
export { UseCases }