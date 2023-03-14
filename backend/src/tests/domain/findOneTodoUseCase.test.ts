import { FindTodoEntity } from "../../domain/entities/todo/FindTodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { TodoNotFindException } from "../../exceptions/TodoNotFindException";
import { SelectServices } from "./utilities/SelectServices";
import { TodoGenerator } from "./utilities/TodoGenerator";

describe('Find one TodoUseCase', ()=>{
  //Selection du repository
  SelectServices.SelectRepositoriesSource();

  // Instance GetAllTodoUseCase
  const findOneTodoUseCase = UseCaseServiceImpl.getUseCases().findOneTodoUseCase;

  beforeEach(()=>{
    // Clear tous les todos
    TodoGenerator.ClearAllTodos();

    // Add 2 todos
    TodoGenerator.CreateTodos();
  });

  // Recherhche d'une Todo
  it('Should find the Todo', async()=>{

    try {
      const findTodoEntity: FindOneTodoSchema = new FindTodoEntity('1');
      const findTodo = await findOneTodoUseCase.execute(findTodoEntity);  
      expect(findTodo.id).toBe('1'); 

    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  // Recherche d'une Todo qui n'existe pas
  it('Should throw TodoNotFindException because Todo not exist', async()=>{
    try {
      const findTodoEntity: FindOneTodoSchema = new FindTodoEntity('3');
      const findTodo = await findOneTodoUseCase.execute(findTodoEntity);  
      expect(findTodo).toBeFalsy();
    } catch (error) {     
      expect(error).toBeInstanceOf(TodoNotFindException)
    }
  });
});