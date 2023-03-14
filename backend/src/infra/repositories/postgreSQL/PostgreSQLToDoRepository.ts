import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema";
import { TodoModel } from "../../models/TodoModel";
import client from './databaseConnexion'

/**
 * Base de données PostgreSQL
 */
class PostgreSQLToDoRepository implements TodoRepositorySchema {
  
  async save(toDo: AddTodoSchema): Promise<TodoModel> {    
    throw new Error("Method not implemented.");
  }
  updateOne(toDo: UpdateTodoSchema): Promise<TodoModel> {
    throw new Error("Method not implemented.");
  }
  async checkToggleItem(toDo: CheckToggleTodoSchema): Promise<TodoModel> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Array<TodoModel>> {
    throw new Error("Method not implemented.");
  }
  async findOne(toDo: FindOneTodoSchema): Promise<TodoModel> {
    throw new Error("Method not implemented.");
  }
  deleteOne(Todo: DeleteTodoSchema): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async deleteAll(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}
export { PostgreSQLToDoRepository }