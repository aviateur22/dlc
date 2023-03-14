import { CheckToggleTodoEntity } from "../../domain/entities/todo/CheckToggleTodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { TodoNotFindException } from "../../exceptions/TodoNotFindException";
import { SelectServices } from "./utilities/SelectServices";
import { TodoGenerator } from "./utilities/TodoGenerator";

describe('UseCase: getAllTodos', () => {  
  //Selection du repository
  SelectServices.SelectRepositoriesSource();

  // Instance GetAllTodoUseCase
  const checkTodoUseCase = UseCaseServiceImpl.getUseCases().CheckToggleTodoUseCase;  

  // Reset de la base de données
  beforeEach(async()=>{
    // Clear tous les todos
    await TodoGenerator.ClearAllTodos();

    // Add 2 todos
    await TodoGenerator.CreateTodos();    
  });

  // Check Todo
  it('Should check-complete Todo', async() => {
    try {
      const checkToggleTodo = new CheckToggleTodoEntity('1', true);

      // Check todo
      const todo = await checkTodoUseCase.execute(checkToggleTodo);

      // Récupération todo modifié
      const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute(checkToggleTodo);

      expect(todo.status).toBeTruthy();
      expect(findTodo.id).toBe(checkToggleTodo.id);
      
    } catch (error) {
      expect(error).toBeFalsy();
    }    
  });

  // Uncheck Todo
  it('Should uncheck complete Todo', async() => {
    try {
      const checkToggleTodo = new CheckToggleTodoEntity('1', false);

      // Uncheck todo
      const todo = await checkTodoUseCase.execute(checkToggleTodo);

      // Récupération todo modifié
      const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute(checkToggleTodo);

      expect(todo.status).toBeFalsy();
      expect(findTodo.id).toBe(checkToggleTodo.id);
      
    } catch (error) {
      expect(error).toBeFalsy();
    }    
  });

  // Check Todo impossible car Todo non existante
  it('Should throw TodoNotfindException because Todo does not exist', async() => {
    try {
      const checkToggleTodo = new CheckToggleTodoEntity('3', true);

      // Check todo
      const todo = await checkTodoUseCase.execute(checkToggleTodo);

      expect(todo).toBeFalsy();
      
    } catch (error) {
      expect(error).toBeInstanceOf(TodoNotFindException);
    }    
  });

  

});