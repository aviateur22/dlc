import { UpdateTodoEntity } from "../../domain/entities/todo/UpdateTodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { ValidationException } from "../../exceptions/ValidationException";
import { TestUtilities } from "../utilities/TestUtilities";

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
testUtilities.selectService();

describe('Update todo UseCase', ()=>{
  
  beforeEach(async()=>{
    await testUtilities.resetParam();
  });

  // Mise a jour d'une todo
  it('Should update a todo', async()=>{
    try {
      // Mise a jour des données
      const updateTodo: UpdateTodoSchema = new UpdateTodoEntity(
        '1', 
        'mon nouveau titre', 
        'ma nouvelle description',
        false

      );

      // Mise à jour de la todo
      const todo = await UseCaseServiceImpl.getUseCases().updateTodoUseCase.execute(updateTodo);
      
      expect(todo.id.toString()).toBe(updateTodo.id.toString());
      expect(todo.status).toBe(updateTodo.status);
      expect(todo.title).toBe(updateTodo.title);
      expect(todo.description).toBe(updateTodo.description);
      
    } catch (error) {      
      expect(error).toBeFalsy();
    }    
  });

  // Refus d'une mise a jour d'une Todo
  it('Should throw UnvalidTodoTitleException because title is missing', async ()=>{
    try {
      // Mise a jour des données
      const updateTodo: UpdateTodoSchema = new UpdateTodoEntity(
        '1', 
        '', 
        'ma nouvelle description',
        false

      );

      // Mise à jour de la todo
      const todo = await UseCaseServiceImpl.getUseCases().updateTodoUseCase.execute(updateTodo);
      expect(todo).toBeFalsy();
    } catch (error) {      
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  // Echec mise a jour Todo avec une description vide
  it('Should update a Todo with an empty Description', async()=>{
    try {
      // Mise a jour des données
      const updateTodo: UpdateTodoSchema = new UpdateTodoEntity(
        '1', 
        'mon nouveau titre', 
        '',
        false

      );

      // Mise à jour de la todo
      const todo = await UseCaseServiceImpl.getUseCases().updateTodoUseCase.execute(updateTodo);
      expect(todo.id.toString()).toBe(updateTodo.id.toString());
      expect(todo.status).toBe(updateTodo.status);
      expect(todo.title).toBe(updateTodo.title);
      expect(todo.description).toBe(updateTodo.description);
      
    } catch (error) {      
      expect(error).toBeFalsy();
    }   
  });
});