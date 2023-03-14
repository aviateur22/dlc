import { TodoEntityMapper } from "../dtos/TodoMapper";
import { TodoEntity } from "../entities/todo/TodoEntity";
import { TodoUseCase } from "./TodoUseCase";

/**
 * Ajout d'un nouveau ToDo
 */
class AddTodoUseCase extends TodoUseCase {  
  
  /**
   * Ajout d'un todo
   * @param {AddTodoSchema} todo - Todo a ajouter 
   * @returns 
   */
  async execute(todo: AddTodoSchema): Promise<TodoEntity> {
    
    const addTodo = await this.repositories.save(todo);    
    return TodoEntityMapper.getTodoEntity(addTodo);
  }
}

export { AddTodoUseCase }