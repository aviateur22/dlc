import { TodoNotFindException } from "../../exceptions/TodoNotFindException";
import { TodoEntityMapper } from "../dtos/TodoMapper";
import { TodoEntity } from "../entities/todo/TodoEntity";
import { TodoUseCase } from "./TodoUseCase";

/**
 * Récupération d'une ToDo
 */
class FindOneTodoUseCase extends TodoUseCase {
  
  /**
   * Recherhce d'une Todo
   * @param {FindOneTodoSchema} todo 
   * @returns {TodoEntity}
   */
  async execute(todo: FindOneTodoSchema): Promise<TodoEntity> {
    const findTodo = await this.repositories.findOne(todo);

    if(!findTodo) {
      throw new TodoNotFindException('todo not find');
    }

    return TodoEntityMapper.getTodoEntity(findTodo);
  }

}
export { FindOneTodoUseCase }