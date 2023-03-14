import { TodoPropertyValidation } from "../../helpers/validator/TodoPropertyValidation";

/**
 * UpdateTodo Entity pour mise a jour d'une todo
 */
class UpdateTodoEntity implements UpdateTodoSchema {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: boolean;

  constructor(id: string, title: string, description: string, status:  boolean) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.status = status;

    // Validation des propriétés de la todo
    new TodoPropertyValidation(this);
  }

}
export { UpdateTodoEntity }