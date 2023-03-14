import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";

/**
 * Gestion des todos pour les tests unitaire
 */
class TodoGenerator {

  /**
   * Récupération du repository
   * @returns { TodoRepositorySchema }
   */
  private static getRepository(): TodoRepositorySchema {  
    return RepositoryServiceImpl.getRepository().todoRepository;
  }

  /**
   * Todos a ajouter
   */  
  private static todos: Array<AddTodoSchema> = [
    {
      title: 'Title 1',
      description: 'Description 1',
      status: false
    },
    {     
      title: 'Title 2',
      description: 'Description 2',
      status: false
    }
  ]



  /**
   * 
   */
  static async CreateTodos() {

    TodoGenerator.todos.forEach(async todo => {
      await TodoGenerator.getRepository().save(todo);
    });
  }

  /**
   * Suppresion de tous les todos
   */
  static async ClearAllTodos() {
    TodoGenerator.getRepository().deleteAll();
  }

  /**
   * Renvoi les Todo
   */
  static async findAllTodos() {
    return await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
  }
}
export { TodoGenerator }