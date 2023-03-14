/**
 * Schema pour mettre a jour un item
 */
interface UpdateTodoSchema {
  id: string;
  title: string;
  description: string;
  status: boolean;
}