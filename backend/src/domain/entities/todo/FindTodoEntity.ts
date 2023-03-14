import { TodoPropertyValidation } from "../../helpers/validator/TodoPropertyValidation";

/**
 * FindTodo Entity pour la recherche d'une Todo
 */
class FindTodoEntity implements FindOneTodoSchema {
  
  public readonly id: string;

  constructor(id: string) {
    this.id = id;

     // Validation des propriétés de la todo
     new TodoPropertyValidation(this);
  }

}

export { FindTodoEntity }