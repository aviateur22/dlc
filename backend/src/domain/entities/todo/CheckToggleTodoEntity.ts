import { TodoPropertyValidation } from "../../helpers/validator/TodoPropertyValidation";

/**
 * CheckTogglEntity pour la modification du statut d'une Todo
 */
class CheckToggleTodoEntity implements CheckToggleTodoSchema {
  public readonly id: string;
  public readonly status: boolean;

  constructor(id: string, status: boolean) {
    this.id = id;
    this.status = status;

     // Validation des propriétés de la todo
     new TodoPropertyValidation(this);
  }
}

export { CheckToggleTodoEntity }