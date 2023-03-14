import { AddTodoEntity } from "../../domain/entities/todo/AddTodoEntity";
import { TodoEntity } from "../../domain/entities/todo/TodoEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { ValidationException } from "../../exceptions/ValidationException";
import { SelectServices } from "./utilities/SelectServices";
import { TodoGenerator } from "./utilities/TodoGenerator";

describe('UseCase: addItem', ()=>{
    //Selection du repository
    SelectServices.SelectRepositoriesSource();

  // Instance GetAllTodoUseCase
  const addTodoUseCase = UseCaseServiceImpl.getUseCases().addTodoUseCase;
  

  beforeEach(async()=>{
    // Clear tous les todos
    await TodoGenerator.ClearAllTodos();
  });

  // Ajout d'un todo avec un titre et une description
  it('Should add one todo', async()=>{
    try {
      const addTodo = await addTodoUseCase.execute({
        title: 'Mon Titre',
        description: 'Ma description',
        status: false
      });
  
      const todos = await TodoGenerator.findAllTodos();
  
      expect(todos.length).toBe(1);
      expect(todos[0].description).toBe('Ma description');
      expect(todos[0].title).toBe('Mon Titre')
      
    } catch (error) {
      expect(error).toBeFalsy();
    }    
  });

  // Ajout d'une todo sans titre
  it('Should throw missingTitleException because title is missing', async()=>{
    try {      
      const addTodoEntity = new AddTodoEntity('', 'Ma description');

      // Ajout de la todo
      await addTodoUseCase.execute(addTodoEntity);
  
      const todos = await TodoGenerator.findAllTodos();
      expect(todos.length).toBe(0);      
      
    } catch (error) {      
      expect(error).toBeInstanceOf(ValidationException);
    }    
  });

  // Ajout d'une todo avec un titre et sans descriptuion 
  it('Should add one todo without description', async()=>{
    try {      
      const addTodoEntity = new AddTodoEntity('Mon titre', '');

      // Ajout de la todo
      const addTodo = await addTodoUseCase.execute(addTodoEntity);
  
      const todos = await TodoGenerator.findAllTodos();

      expect(todos[0]).toBeInstanceOf(TodoEntity);
      expect(todos[0].id).toBe("1");
      expect(addTodo.title).toBe("Mon titre");
      expect(addTodo.description).toBe("");
      expect(todos.length).toBe(1);      
      
    } catch (error) {      
      expect(error).toBeFalsy();
    }
  });
});