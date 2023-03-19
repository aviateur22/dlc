import { AddTodoUseCase } from "../../../useCases/todo/AddToDoUseCase";
import { CheckToggleTodoUseCase } from "../../../useCases/todo/CheckToggleTodoUseCase";
import { DeleteOneTodoUseCase } from "../../../useCases/todo/DeleteOneTodoUseCase";
import { FindAllToDoUseCase } from "../../../useCases/todo/FindAllToDoUseCase";
import { FindOneTodoUseCase } from "../../../useCases/todo/FindOneTodoUseCase";
import { UpdateTodoUseCase } from "../../../useCases/todo/UpdateToDoUseCase";

export class TodoUseCase {
  //Todo: Delete
  readonly addTodoUseCase!: AddTodoUseCase;
  readonly CheckToggleTodoUseCase!: CheckToggleTodoUseCase;
  readonly updateTodoUseCase!: UpdateTodoUseCase;
  readonly findAllToDoUseCase!: FindAllToDoUseCase;
  readonly findOneTodoUseCase!: FindOneTodoUseCase;
  readonly deleteOneTodoUseCase!: DeleteOneTodoUseCase
}