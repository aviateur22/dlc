import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema";
import { TodoModel } from "../../models/TodoModel";
import client from './databaseConnexion'

/**
 * Base de données PostgreSQL
 */
class PostgreSQLToDoRepository implements TodoRepositorySchema {
  
  async save(todo: AddTodoSchema): Promise<TodoModel> {  
    const addTodo = await client.query('INSERT INTO "todo" ("title", "description", "status") VALUES ($1 , $2, $3) RETURNING *', [
      todo.title, todo.description, todo.status
    ]);

    return addTodo.rows.shift();
  }

  /**
   * Update Todo
   * @param {UpdateTodoSchema} todo 
   */
  async updateOne(todo: UpdateTodoSchema): Promise<TodoModel> {
    const updateTodo = await client.query('UPDATE todo SET title=$1, description=$2 where id=$3 RETURNING *', [
      todo.title, todo.description, todo.id
    ]);

    return updateTodo.rows.shift();
  }

  /**
   * ToogleCheck 1 todo
   * @param {CheckToggleTodoSchema} todo
   */
  async checkToggleItem(todo: CheckToggleTodoSchema): Promise<TodoModel> {
    const checkTogleTodo = await client.query('UPDATE todo SET status=$1 WHERE id=$2 RETURNING *', [
      todo.status, todo.id
    ]);
    return checkTogleTodo.rows.shift();

  }

  /**
   * Recherche de toutes les todos
   */
  async findAll(): Promise<Array<TodoModel>> {
    const todos = await client.query('SELECT * FROM todo ORDER BY "createdAt" DESC');
    return todos.rows;
  }

  /**
   * Recherche de une todo
   * @param todo 
   */
  async findOne(todo: FindOneTodoSchema): Promise<TodoModel> {
    const findTodo = await client.query('SELECT * from "todo" WHERE id = $1', [
      todo.id
    ]);

    return findTodo.rows.shift();
  }

  /**
   * Suppression d'une Todo
   * @param {DeleteTodoSchema} Todo 
   */
  async deleteOne(todo: DeleteTodoSchema): Promise<boolean> {
    const deleteTodo = await client.query('DELETE FROM todo WHERE id = $1',[
      todo.id
    ]);
    return true;
  }

  /**
   * Suppression de tous les todos
   * @returns 
   */
  async deleteAll(): Promise<boolean> {
    const deleteTodos = await client.query('TRUNCATE "todo" RESTART IDENTITY');
    return true;
  }
  
}
export { PostgreSQLToDoRepository }