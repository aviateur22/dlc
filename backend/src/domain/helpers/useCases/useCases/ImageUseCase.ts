import { AddImageUseCase } from "../../../useCases/image/AddImageUseCase";
import { FindProductImageUseCase } from "../../../useCases/image/FindProductImageUseCase";

export class ImageUseCase {
  readonly addImageUseCase: AddImageUseCase = new AddImageUseCase();
  readonly findProductImageUseCase: FindProductImageUseCase = new FindProductImageUseCase();
}