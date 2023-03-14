import { CheckToggleTodoEntity } from "../../domain/entities/todo/CheckToggleTodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { TodoNotFindException } from "../../exceptions/TodoNotFindException";
import { TestUtilities } from "../utilities/TestUtilities";

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
testUtilities.selectService();

describe('UseCase: getAllTodos', () => {  

  beforeEach(async()=>{
    await testUtilities.resetParam();
  });

  // Check Todo
  it('Should check-complete Todo', async() => {
    try {
      const checkToggleTodo = new CheckToggleTodoEntity('1', true);

      // Check todo
      const todo = await UseCaseServiceImpl.getUseCases().CheckToggleTodoUseCase.execute(checkToggleTodo);

      // Récupération todo modifié
      const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute(checkToggleTodo);

      expect(todo.status).toBeTruthy();
      expect(findTodo.id.toString()).toBe(checkToggleTodo.id.toString());
      
    } catch (error) {
      expect(error).toBeFalsy();
    }    
  });

  // Uncheck Todo
  it('Should uncheck complete Todo', async() => {
    try {
      const checkToggleTodo = new CheckToggleTodoEntity('1', false);

      // Uncheck todo
      const todo = await UseCaseServiceImpl.getUseCases().CheckToggleTodoUseCase.execute(checkToggleTodo);

      // Récupération todo modifié
      const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute(checkToggleTodo);

      expect(todo.status).toBeFalsy();
      expect(findTodo.id.toString()).toBe(checkToggleTodo.id.toString());
      
    } catch (error) {
      expect(error).toBeFalsy();
    }    
  });

  // Check Todo impossible car Todo non existante
  it('Should throw TodoNotfindException because Todo does not exist', async() => {
    try {
      const checkToggleTodo = new CheckToggleTodoEntity('3', true);

      // Check todo
      const todo = await UseCaseServiceImpl.getUseCases().CheckToggleTodoUseCase.execute(checkToggleTodo);

      expect(todo).toBeFalsy();
      
    } catch (error) {
      expect(error).toBeInstanceOf(TodoNotFindException);
    }    
  });

  

});