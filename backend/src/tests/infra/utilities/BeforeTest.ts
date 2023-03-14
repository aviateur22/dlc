import { SelectServices } from "../../domain/utilities/SelectServices";
import { TodoGenerator } from "../../domain/utilities/TodoGenerator";

export class BeforeTest {
  static async resetParameter() {
    // Selection logger
    SelectServices.selectLoggerSource();

    // Repositories
    SelectServices.SelectRepositoriesSource();

    // Clear tous les todos
    await TodoGenerator.ClearAllTodos();

    // Add 2 todos
    await TodoGenerator.CreateTodos();
  }
}