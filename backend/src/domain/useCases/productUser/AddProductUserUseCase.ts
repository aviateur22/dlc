import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { AddProductUserEntity } from "../../entities/productUser/AddProductUserEntity";
import { ProductUserEntity } from "../../entities/productUser/ProductUserEntity";
import { UseCaseModel } from "../UseCaseModel";

export class AddProductUserUseCase extends UseCaseModel{
/**
 * AddProductUser
 */
 async execute(addProductUser: Partial<AddProductUserEntity>): Promise<ProductUserEntity> {

  // Ajout du produit
  const productUser = await this.repositories.productUserRepository.save(new AddProductUserEntity({...addProductUser}));

  if(!productUser) {
    throw new ErrorDatabaseException('error database');
  }

  return new ProductUserEntity({...productUser});
 }
}