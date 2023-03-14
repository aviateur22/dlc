import { TodoEntity } from "../../domain/entities/todo/TodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { SelectServices } from "./utilities/SelectServices";
import { TodoGenerator } from "./utilities/TodoGenerator";

describe('UseCase: getAllTodos', () => {  
  //Selection du repository
  SelectServices.SelectRepositoriesSource();

  // Instance GetAllTodoUseCase
  const findAllToDoUseCase = UseCaseServiceImpl.getUseCases().findAllToDoUseCase;

  // Reset de la base de données
  beforeEach(async()=>{
    // Clear tous les todos
    await TodoGenerator.ClearAllTodos();

    // Add 2 todos
    await TodoGenerator.CreateTodos();    
  });

  it('Should find 2 todos', async() => {
    try {      
      // Recupération des Todos
      const todos = await findAllToDoUseCase.execute();

      expect(todos.length).toBe(2);
      expect(todos[0]).toBeInstanceOf(TodoEntity);
    }
    catch(error) {
      expect(error).toBeFalsy();
    }
  });

  it('Should find no todo', async() => {
    try {     
      // Clear tous les todos
      await TodoGenerator.ClearAllTodos();

      // Recupération des Todos
      const todos = await findAllToDoUseCase.execute();

      expect(todos.length).toBe(0);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  })

});