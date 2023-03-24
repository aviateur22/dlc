import { ImageRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ImageRepositorySchema";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductUserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductUserRepositorySchema";
import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema"
import { UserFriendRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserFriendRepositorySchema";
import { UserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserRepositorySchema";

/**
 * Regroupement des repositories
 */
class Repositories {
  // A faire: a supprimer
  readonly todoRepository: TodoRepositorySchema;

  // repository User
  readonly userRepository: UserRepositorySchema;

  // Repository Product
  readonly productRepository: ProductRepositorySchema;

  // Repository Image
  readonly imageRepository: ImageRepositorySchema;

  // Repository ProductUser 
  readonly productUserRepository: ProductUserRepositorySchema;

  // Repository Friend
  readonly userFriendRepository: UserFriendRepositorySchema

  constructor(
    todoRepository: TodoRepositorySchema,
    userRepository: UserRepositorySchema,
    productRepository: ProductRepositorySchema,
    imageRepository: ImageRepositorySchema,
    productUserRepository: ProductUserRepositorySchema,
    userFriendRepository: UserFriendRepositorySchema
  ) {
    // A faire: a supprimer
    this.todoRepository = todoRepository;
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.imageRepository = imageRepository;
    this.productUserRepository = productUserRepository;
    this.userFriendRepository = userFriendRepository
  }
}
export { Repositories }