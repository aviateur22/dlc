import { TodoEntity } from '../../../domain/entities/todo/TodoEntity';
import { UseCaseServiceImpl } from '../../../domain/services/UseCaseServiceImpl';
import { AddTodoUseCase } from '../../../domain/useCases/AddToDoUseCase';
import { CheckToggleTodoUseCase } from '../../../domain/useCases/CheckToggleTodoUseCase';
import { DeleteOneTodoUseCase } from '../../../domain/useCases/DeleteOneTodoUseCase';
import { FindAllToDoUseCase } from '../../../domain/useCases/FindAllToDoUseCase';
import { FindOneTodoUseCase } from '../../../domain/useCases/FindOneTodoUseCase';
import { UpdateTodoUseCase } from '../../../domain/useCases/UpdateToDoUseCase';
import { ValidationException } from '../../../exceptions/ValidationException';

export class TodoDataAccess {

  /**
   * Liste des todos
   * @returns { Array<TodoEntity>}
   */
  static async findAllTodos(): Promise<Array<TodoEntity>> {
    // UseCase
    const findAllTodosUseCase: FindAllToDoUseCase = UseCaseServiceImpl.getUseCases().findAllToDoUseCase;  
    const todos = await findAllTodosUseCase.execute();
    return todos;
  }

  /**
   * Ajout d'une todo
   * @param { string } title 
   * @param { string } description 
   * @returns { TodoEntity } - todo ajouté
   */
  static async addTodo(title: string, description: string): Promise<TodoEntity> {
    
    // Vérification de la description
    if(typeof description === 'undefined') {      
      description = '';
    }
    
    // Vérification de la description
    if(typeof title === 'undefined') {
      throw new ValidationException('title is mandatory');
    }
    // todo a envoyer
    const todo: AddTodoSchema = {
      title,
      description,
      status: false
    }
    
    // UseCase
    const addTodoUseCase: AddTodoUseCase = UseCaseServiceImpl.getUseCases().addTodoUseCase;   
    const addTodo: TodoEntity = await addTodoUseCase.execute(todo);
    return addTodo;
  }

  /**
   * Mise à jour d'une Todo
   * @param id 
   * @param title 
   * @param description 
   * @param status 
   */
  static async updateTodo(
    id: string, 
    title: string, 
    description: 
    string, 
    status: boolean
  ): Promise<TodoEntity> {
    // Vérification de la description
    if(typeof id === 'undefined') {
      throw new ValidationException('id is mandatory');
    }

    // Vérification de la description
    if(typeof description === 'undefined') {      
      description = '';
    }
    
    // Vérification de la description
    if(typeof title === 'undefined') {
      throw new ValidationException('title is mandatory');
    }

    // Vérification de la description
    if(typeof status === 'undefined') {
      throw new ValidationException('status is mandatory');
    }

    // Todo a mettre a jour
    const todo: UpdateTodoSchema = {
      id,
      title,
      description,
      status
    }

    // UseCase
    const updateTodoUseCase: UpdateTodoUseCase = UseCaseServiceImpl.getUseCases().updateTodoUseCase;   
    const updateTodo: TodoEntity = await updateTodoUseCase.execute(todo);
    return updateTodo;
  }

  /**
   * Recherche de une Todo
   * @param { string } id
   * @returns { TodoEntity }
   */
  static async findOneTodo(id: string): Promise<TodoEntity> {

    if(typeof id === 'undefined') {
      throw new ValidationException('id is mandatory');
    }

    const todo: FindOneTodoSchema = {
      id
    };

    // UseCase
    const findOneTodoUseCase: FindOneTodoUseCase = UseCaseServiceImpl.getUseCases().findOneTodoUseCase;   
    const findTodo: TodoEntity = await findOneTodoUseCase.execute(todo);
    return findTodo;
  }

  /**
   * Supprssion de une Todo
   * @param { string } id 
   * @returns { TodoEntity }
   */
  static async deleteOneTodo(id: string): Promise<TodoEntity> {
    if(typeof id === 'undefined') {
      throw new ValidationException('id is mandatory');
    }

    const todo: DeleteTodoSchema = {
      id
    };

    // UseCase
    const deleteOneTodoUseCase: DeleteOneTodoUseCase = UseCaseServiceImpl.getUseCases().deleteOneTodoUseCase;   
    const deleteTodo: TodoEntity = await deleteOneTodoUseCase.execute(todo);
    return deleteTodo;
  }

  /**
   * Check Toggle une Todo
   * @param { string } id 
   * @param { boolean } status 
   */
  static async checkToggleOneTodo(id: string, status: boolean): Promise<TodoEntity> {
    if(typeof id === 'undefined') {
      throw new ValidationException('id is mandatory');
    }

    if(typeof status === 'undefined') {
      throw new ValidationException('status is mandatory')
    }

    // Todo a mettre a jour
    const todo: CheckToggleTodoSchema = {
      id,
      status
    }

    // UseCase
    const dcheckToggleOneTodoUseCase: CheckToggleTodoUseCase = UseCaseServiceImpl.getUseCases().CheckToggleTodoUseCase;   
    const checkTodo: TodoEntity = await dcheckToggleOneTodoUseCase.execute(todo);
    return checkTodo;
  }
}