import { TodoEntityMapper } from "../../dtos/TodoMapper";
import { TodoEntity } from "../../entities/todo/TodoEntity";
import { UseCaseServiceImpl } from "../../services/UseCaseServiceImpl";
import { TodoUseCase } from "./TodoUseCase";

/**
 * Usecase CheckToDoUseCase
 */
class CheckToggleTodoUseCase extends TodoUseCase {
  
  /**
   * 
   * @param {CheckToggleTodoSchema} todo 
   * @returns {TodoEntity}
   */
  async execute(todo: CheckToggleTodoSchema): Promise<TodoEntity> {
    // Recherche todo
    await UseCaseServiceImpl.getUseCases().todoUseCase.findOneTodoUseCase.execute(todo);

    // Mise a jour status
    const checkToggleTodo = await this.repositories.checkToggleItem(todo);

    // renvoie la Todo mis a jour
    return TodoEntityMapper.getTodoEntity(checkToggleTodo);
  }

}

export { CheckToggleTodoUseCase }