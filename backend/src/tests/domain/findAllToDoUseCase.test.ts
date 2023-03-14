import { TodoEntity } from "../../domain/entities/todo/TodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { TestUtilities } from "../utilities/TestUtilities";
import { TodoGenerator } from "../utilities/TodoGenerator";

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
testUtilities.selectService();

describe('UseCase: getAllTodos', () => { 

  beforeEach(async()=>{
    await testUtilities.resetParam();
  });  

  afterEach(async()=>{
    await testUtilities.resetParam();
  });
  
  it('Should find 2 todos', async() => {
    try {      
      // Recupération des Todos
      const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

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
      const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

      expect(todos.length).toBe(0);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  })

});