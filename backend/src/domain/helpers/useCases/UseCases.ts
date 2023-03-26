// UseCase
import { UserUseCase } from "./useCases/UserUseCase";
import { ProductUseCase } from "./useCases/ProductUseCase";
import { ImageUseCase } from "./useCases/ImageUseCase";
import { ProductUserUseCase } from "./useCases/ProductUserUseCase";
import { TodoUseCase } from "./useCases/TodoUseCase";
import { FriendUseCase } from "./useCases/FriendUseCase";
import { RelationUseCase } from "./useCases/RelationUseCase";

/**
 * UseCases disponibles dans le domaine
 */
class UseCases {

  //readonly todoUsecase: TodoUseCase;
  readonly userUsecase: UserUseCase = new UserUseCase();
  readonly productUsecase: ProductUseCase = new ProductUseCase();
  readonly imageUseCase: ImageUseCase = new ImageUseCase();
  readonly productUserUsecase: ProductUserUseCase = new ProductUserUseCase();
  readonly todoUseCase: TodoUseCase = new TodoUseCase();
  readonly friendUseCase: FriendUseCase = new FriendUseCase();
  readonly relationUseCase: RelationUseCase = new RelationUseCase();

}
export { UseCases }