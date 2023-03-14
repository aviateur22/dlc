import { FindTodoEntity } from "../../domain/entities/todo/FindTodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { TodoNotFindException } from "../../exceptions/TodoNotFindException";
import { TestUtilities } from "../utilities/TestUtilities";

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
testUtilities.selectService();

describe('Find one TodoUseCase', ()=>{

  beforeEach(async()=>{
    await testUtilities.resetParam();
  });
  
  // Recherhche d'une Todo
  it('Should find the Todo', async()=>{

    try {
      const findTodoEntity: FindOneTodoSchema = new FindTodoEntity('1');
      const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute(findTodoEntity);  
      expect(findTodo.id.toString()).toBe('1'); 

    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  // Recherche d'une Todo qui n'existe pas
  it('Should throw TodoNotFindException because Todo not exist', async()=>{
    try {
      const findTodoEntity: FindOneTodoSchema = new FindTodoEntity('3');
      const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute(findTodoEntity);  
      expect(findTodo).toBeFalsy();
    } catch (error) {     
      expect(error).toBeInstanceOf(TodoNotFindException)
    }
  });
});