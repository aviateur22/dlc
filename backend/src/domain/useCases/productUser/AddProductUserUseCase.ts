import { AddProductUserEntity } from "../../entities/productUser/AddProductUserEntity";
import { ProductUserEntity } from "../../entities/productUser/ProductUserEntity";

export class AddProductUserUseCase {
/**
 * AddProductUser
 */
 async execute(addImage: Partial<AddProductUserEntity>): Promise<ProductUserEntity> {
  return new ProductUserEntity({
    id: '',
    userId: '',
    productId: '',
    createdAt: new Date(),
    updatedAt: new Date()
  });
 }
}