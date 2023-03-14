import { DeleteTodoEntity } from "../../domain/entities/todo/DeleteTodoEntity";
import { TodoEntity } from "../../domain/entities/todo/TodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { TodoNotFindException } from "../../exceptions/TodoNotFindException";
import { TestUtilities } from "../utilities/TestUtilities";

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
testUtilities.selectService();

describe('DeleteOneTodo useCase', ()=>{

  beforeEach(async()=>{
    await testUtilities.resetParam();
  });

  afterEach(async()=>{
    await testUtilities.resetParam();
  });

  // Suppression de une Todo
  it('Should delete one Todo', async()=>{
    try {
      // Todo a supprimé
      const deleteTodo: DeleteTodoSchema = new DeleteTodoEntity('1');
      
      // Suppression d'une Todo
      const todo: TodoEntity = await UseCaseServiceImpl.getUseCases().deleteOneTodoUseCase.execute(deleteTodo);

      // Récupération des todos
      const todos: Array<TodoEntity> = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

      expect(todo.id.toString()).toBe("1");
      expect(todos.length).toBe(1);      
    } catch (error) {
      expect(error).toBeFalsy()
    }    
  });

  //Echec suppression todo
  it('Should throw TodoNotFindException because todo does not exist', async()=>{
    try {
      // Todo a supprimé
      const deleteTodo: DeleteTodoSchema = new DeleteTodoEntity('5');
      
      // Suppression d'une Todo
      const todo: TodoEntity = await UseCaseServiceImpl.getUseCases().deleteOneTodoUseCase.execute(deleteTodo);

      // Récupération des todos
      const todos: Array<TodoEntity> = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();


      expect(todo).toBeFalsy();
      expect(todos.length).toBe(2);      
    } catch (error) {
      expect(error).toBeInstanceOf(TodoNotFindException);
    }    

  });
});