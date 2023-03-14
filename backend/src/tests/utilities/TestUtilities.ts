import { TodoEntity } from "../../domain/entities/todo/TodoEntity";
import { TodoRepositorySchema } from "../../domain/ports/repositoriesSchemas/TodoRepositorySchema";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { ServerSource } from "../../infra/helpers/server/ServerSource";
import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";
import { ServerServiceImpl } from "../../infra/services/server/ServerServiceImpl";
import { SelectServices } from "./SelectServices";


export class TestUtilities {
  
  /**
   * Todos a ajouter
   */  
  private todos: Array<AddTodoSchema> = [
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
   * Initilise les services pour les tests
   * 
   * @returns {number} - Service selectionné
   */
  selectService(): number {
    // Selection Backend
    const selectedService: number = SelectServices.SelectBackend();

    // Selection logger
    SelectServices.selectLoggerSource();

    // Repositories
    SelectServices.SelectRepositoriesSource();

    return selectedService;
  }

  /**
   * Reset des parametres entre chaque service
   */
  async resetParam() {
    // Clear tous les todos
    await this.clearAllTodos();

    // Add 2 todos
    await this.createTodos();
  }  

  /**
   * Récupération du server
   * @returns {any}
   */
  getBackend(): any {
    return ServerServiceImpl.getServer();
  }

  /**
   * Récupération du repository
   * @returns { TodoRepositorySchema }
   */
  private getRepository(): TodoRepositorySchema {  
    return RepositoryServiceImpl.getRepository().todoRepository;
  }

  /**
   * App pour les tests 
   * @param app 
   * @param selectedServer 
   * @returns  
   */
  getTestApp(app: any, selectedServer: number): any {
    switch(selectedServer) {
      case ServerSource.express: return app; break;
      case ServerSource.fastify: return app.server; break;
      default: return app; break;
    }
  }

  /**
   * Création de Todos
   */
  async createTodos(): Promise<void> {

    for(const todo of this.todos) {
      const addTodo = await UseCaseServiceImpl.getUseCases().addTodoUseCase.execute(todo);
    }
  }

  /**
   * Suppresion de tous les todos
   */
  async clearAllTodos(): Promise<void> {
    await this.getRepository().deleteAll();
  }

  /**
   * Renvoi les Todo
   */
  async findAllTodos(): Promise<Array<TodoEntity>> {
    const findAllTodos =  await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
    return findAllTodos;
  }
}