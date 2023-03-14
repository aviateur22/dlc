import { TodoModel } from "../../infra/models/TodoModel";
import { TodoEntity } from "../entities/todo/TodoEntity";

class TodoEntityMapper {
  
  /**
   * Mapper TodoModel vers  TodoEntity
   * @param { TodoModel } todo 
   * @returns { TodoEntity }
   */
  static getTodoEntity(todo: TodoModel): TodoEntity {
    return new TodoEntity(
      todo.id,
      todo.title,
      todo.description,
      todo.status,
      todo.createdAt,
      todo.updatedAt
    );
  }

  /**
   * Mapper Array<TodoModel> vers  Array<TodoEntity> 
   * @param { Array<TodoModel> } todos 
   * @returns { Array<TodoEntity>}
   */
  static getTodoEntities(todos: Array<TodoModel>): Array<TodoEntity> {
    
    // Array de TodoEntity
    let todoEntities: Array<TodoEntity> = [];

    todos.forEach(todo => {
      todoEntities.push(TodoEntityMapper.getTodoEntity(todo));
    });

    return todoEntities;
  }
}

export {TodoEntityMapper}