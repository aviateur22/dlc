import { DeleteTodoException } from "../../exceptions/DeleteTodoException";
import { TodoModel } from "../../infra/models/TodoModel";
import { TodoEntityMapper } from "../dtos/TodoMapper";
import { TodoEntity } from "../entities/todo/TodoEntity";
import { TodoUseCase } from "./TodoUseCase";

/**
 * Suppression d'une ToDo
 */
class DeleteOneTodoUseCase extends TodoUseCase {

  /**
   * Suppression d'une Todo
   * @param deleteTodo 
   * @return { TodoEntity }
   */
  async execute(deleteTodo: DeleteTodoSchema):Promise<TodoEntity> {

    // Vérification existance de la Todo
    const findTodo = await this.useCases.findOneTodoUseCase.execute(deleteTodo);

    // Suppresion de la Todo
    const successDelete = await this.repositories.deleteOne(deleteTodo);

    if(!successDelete) {
      throw new DeleteTodoException();
    }

    // Todo de supprimé
    return TodoEntityMapper.getTodoEntity(new TodoModel(
      findTodo.id,
      findTodo.title,
      findTodo.description,
      findTodo.status,
      findTodo.createdAt,
      findTodo.updatedAt
      ));
  }

}
export { DeleteOneTodoUseCase }