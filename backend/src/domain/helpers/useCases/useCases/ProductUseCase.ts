import { AddProductUseCase } from "../../../useCases/product/AddProductUseCase";
import { DeleteProductUseCase } from "../../../useCases/product/DeleteProductUseCase";
import { FindProductUseCase } from "../../../useCases/product/FindProductUseCase";

export class ProductUseCase {
  readonly addProductUseCase = new AddProductUseCase();
  readonly deleteProductUseCase = new DeleteProductUseCase();
  readonly findProductUseCase = new FindProductUseCase();
}