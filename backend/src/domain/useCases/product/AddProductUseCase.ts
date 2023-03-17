import { AddProductException } from "../../../exceptions/AddProductException";
import { AddProductEntity } from "../../entities/product/AddProductEntity";
import { ProductEntity } from "../../entities/product/ProductEntity";
import { ProductImageEntity } from "../../entities/product/ProductImageEntity";
import { ProductUserEntity } from "../../entities/productUser/ProductUserEntity";
import { UseCaseServiceImpl } from "../../services/UseCaseServiceImpl";
import { UseCaseModel } from "../UseCaseModel";

export class AddProductUseCase extends UseCaseModel {
  
  async execute(addProduct: Partial<AddProductEntity>): Promise<ProductEntity> {

    if(!addProduct.imageBase64 || !addProduct.mimeType) {
      throw new AddProductException('');
    }

    // Ajout de l'image
    const addImage = await UseCaseServiceImpl.getUseCases().imageUseCase.addImageUseCase.execute({
      imageBase64: addProduct.imageBase64,
      mimType: addProduct.mimeType
    });
    
    if(!addImage) {
      throw new AddProductException('');
    }

    const productImage = new ProductImageEntity({
      imageId: addImage.id,
      openDate: addProduct.openDate
    });

    // Ajout du produit
    const product = await this.repositories.productRepository.save(productImage);

    if(!product) {
      throw new AddProductException('');
    }

    const productUser = new ProductUserEntity({
      productId: product.id,
      userId: addProduct.userId
    });

    // Ajout du ProduitUser
    UseCaseServiceImpl.getUseCases().productUserUsecase.addProductUserUseCase.execute(productUser);

    return new ProductEntity({
      id: product.id,
      openDate: product.openDate,
      imageId: product.imageId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    });
  }
}