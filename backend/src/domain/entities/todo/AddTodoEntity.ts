import { TodoPropertyValidation } from "../../helpers/validator/TodoPropertyValidation";

/**
 * AddTodo Entité pour ajout d'un nouveau todo
 */
class AddTodoEntity implements AddTodoSchema {
  readonly title: string;
  readonly description: string;
  readonly status: boolean;

  constructor(title: string, description: string) {
    this.description = description;
    this.title = title;
    this.status = false;
    
    // Validation des propriétés de la todo
    new TodoPropertyValidation(this);
  }

}
export { AddTodoEntity }