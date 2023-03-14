import { TodoModel } from "../../../infra/models/TodoModel";

/**
 * Schema base de données Item
 */
interface TodoRepositorySchema {

  /**
   * 
   * @param {AddItemSchema} Todo 
   */
  save(Todo: AddTodoSchema): Promise<TodoModel>;

  /**
   * Mise a jour des données d'un item
   * @param {UpdateTodoSchema} Todo 
   */
  updateOne(Todo: UpdateTodoSchema): Promise<TodoModel>;

  /**
   * Check ou unCheck un item
   * @param {CheckItemSchema} Todo 
   */
  checkToggleItem(Todo: CheckToggleTodoSchema): Promise<TodoModel>;

  /**
   * Récupération de tous les items
   */
  findAll(): Promise<Array<TodoModel>>

  /**
   * Récuperation de 1 item
   * @param {FindOneTodoSchema} Todo 
   */
  findOne(Todo: FindOneTodoSchema): Promise<TodoModel|null>;

  /**
   * Suppression de 1 item
   * @param Todo 
   */
  deleteOne(Todo: DeleteTodoSchema): Promise<boolean>;

  /**
   * Suppression de tous les todos
   */
  deleteAll(): Promise<boolean>



}

export { TodoRepositorySchema }
