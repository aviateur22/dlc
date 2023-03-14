/**
 * TodoEntity pour supression d'une Todo
 */
class DeleteTodoEntity implements DeleteTodoSchema {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

}
export { DeleteTodoEntity }