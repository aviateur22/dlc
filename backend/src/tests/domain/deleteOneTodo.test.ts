import { DeleteTodoEntity } from "../../domain/entities/todo/DeleteTodoEntity";
import { TodoEntity } from "../../domain/entities/todo/TodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { TodoNotFindException } from "../../exceptions/TodoNotFindException";
import { SelectServices } from "./utilities/SelectServices";
import { TodoGenerator } from "./utilities/TodoGenerator";

describe('DeleteOneTodo useCase', ()=>{
  //Selection du repository
  SelectServices.SelectRepositoriesSource();

  // delete useCase
  const deleteTodoUseCase = UseCaseServiceImpl.getUseCases().deleteOneTodoUseCase;

  // findAll useCase
  const findAllTodoUseCase = UseCaseServiceImpl.getUseCases().findAllToDoUseCase;

  beforeEach(()=>{
    // Suppression des Todos
    TodoGenerator.ClearAllTodos();

    // Ajout de 2 Todos
    TodoGenerator.CreateTodos();
  });

  // Suppression de une Todo
  it('Should delete one Todo', async()=>{
    try {
      // Todo a supprimé
      const deleteTodo: DeleteTodoSchema = new DeleteTodoEntity('1');
      
      // Suppression d'une Todo
      const todo: TodoEntity = await deleteTodoUseCase.execute(deleteTodo);

      // Récupération des todos
      const todos: Array<TodoEntity> = await findAllTodoUseCase.execute();

      expect(todo.id).toBe("1");
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
      const todo: TodoEntity = await deleteTodoUseCase.execute(deleteTodo);

      // Récupération des todos
      const todos: Array<TodoEntity> = await findAllTodoUseCase.execute();

      expect(todo).toBeFalsy();
      expect(todos.length).toBe(2);      
    } catch (error) {
      expect(error).toBeInstanceOf(TodoNotFindException);
    }    

  });
});