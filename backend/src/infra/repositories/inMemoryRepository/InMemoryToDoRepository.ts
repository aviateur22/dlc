import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema";
import { TodoNotFindException } from "../../../exceptions/TodoNotFindException";

import { TodoModel } from "../../models/TodoModel";

/**
 * Repository InMemory
 */
class InMemoryToDoRepository implements TodoRepositorySchema {
  
  private todos: Array<TodoModel> = [];

  /**
   * Ajout d'un todo
   * @param {AddTodoSchema} todoSchema 
   * @returns {TodoModel}
   */
  async save(todoSchema: AddTodoSchema): Promise<TodoModel> {
    // Index
    const index: number = this.todos.length === 0 ? 1 : Math.max(...this.todos.map(x=>Number(x.id))) + 1;

    const todoModel = new TodoModel(
      index.toString(),
      todoSchema.title,
      todoSchema.description,
      todoSchema.status,
      new Date(),
      new Date()
    )

    this.todos.push(todoModel);
    return todoModel;
  }

  /**
   * Mise a jour d'une Todo
   * @param {UpdateTodoSchema} todoSchema 
   * @returns {TodoModel}
   */
  async updateOne(todoSchema: UpdateTodoSchema): Promise<TodoModel> {   

    // Index
    const index: number = Number(todoSchema.id);

    // Recherche Todo
    const findTodo = await this.todos.find(todo => (todoSchema.id === todo.id));

    if(!findTodo) {
      throw new TodoNotFindException('todo not find');
    }

    // Modification des propriété
    findTodo.title = todoSchema.title;
    findTodo.description = todoSchema.description;  
    findTodo.updatedAt = new Date();

    const updateTodo = await this.findOne(todoSchema);

    if(!updateTodo) {
      throw new TodoNotFindException('todo not find');
    }
    
    return updateTodo;

  }

  /**
   * 
   * @param todoSchema 
   * @returns 
   */
  async checkToggleItem(todoSchema: CheckToggleTodoSchema): Promise<TodoModel> {  
    // Index
    const index: number = Number(todoSchema.id);
    

    const findTodo = await this.todos.find(todo => (todoSchema.id === todo.id));
  
    if(!findTodo) {
      throw new TodoNotFindException('todo not find');
    }

    // Modification des propriété
    findTodo.status = todoSchema.status;
    findTodo.updatedAt = new Date();
    
    const updateTodo = await this.findOne(todoSchema);
   
    if(!updateTodo) {
      throw new TodoNotFindException('todo not find');
    }
    
    return updateTodo;
  }

  /**
   * Renvoie les todos
   * @returns {Array<TodoModel>}
   */
  async findAll(): Promise<Array<TodoModel>> {
    // Tris des todo du plus recent au plus ancien
    this.todos.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    
    return this.todos;
  }

  /**
   * Recherche d'une todo
   * @param {GetOneTodoSchema} todoSchema 
   * @returns {TodoModel|null}
   */
  async findOne(todoSchema: FindOneTodoSchema): Promise<TodoModel|null> {
    const findTodo = await this.todos.find(todo => (todoSchema.id === todo.id));
    return findTodo !== undefined ? findTodo : null;
  }

  /**
   * Suppression d'une todo
   * @param {DeleteTodoSchema} TodoSchema 
   */
  async deleteOne(TodoSchema: DeleteTodoSchema): Promise<boolean> {
    
    // Recherche de l'index
    const todoIndex: number = this.todos.findIndex(todo=> todo.id === TodoSchema.id);

    if(todoIndex < 0) {
      throw new TodoNotFindException('todo not find');
    }

    // Suppression de la todo
    this.todos.splice(todoIndex, 1);

    return true;
  }

  /**
   * Suppression des Todos
   */
  async deleteAll(): Promise<boolean> {
    this.todos = [];
    return true;
  }  
 
}

export { InMemoryToDoRepository }