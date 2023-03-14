import { TodoModel } from "../../infra/models/TodoModel";
import { TodoEntityMapper } from "../dtos/TodoMapper";
import { TodoEntity } from "../entities/todo/TodoEntity";
import { TodoUseCase } from "./TodoUseCase";

/**
 * Mise a jour du contenue d'une Todo
 */
class UpdateTodoUseCase extends TodoUseCase {
  
  /**
   * Mise a jour d'une Todo
   * @param { UpdateTodoSchema } updateUseCase 
   * @returns { TodoEntity }
   */
  async execute(updateTodo: UpdateTodoSchema): Promise<TodoEntity> {

    // Recherche existance todo
    await this.useCases.findOneTodoUseCase.execute(updateTodo);
    
    // Mise a jour de données
    const todo = await this.repositories.updateOne(updateTodo);

    return TodoEntityMapper.getTodoEntity(
      new TodoModel(
        todo.id,
        todo.title,
        todo.description,     
        todo.status,
        todo.createdAt,
        todo.updatedAt
      )
    );
  }
}

export { UpdateTodoUseCase }