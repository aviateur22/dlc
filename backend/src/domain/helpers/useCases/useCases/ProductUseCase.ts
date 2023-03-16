import { AddProductUseCase } from "../../../useCases/product/AddProductUseCase";

export class ProductUseCase {
  readonly addProductUseCase = new AddProductUseCase();
}