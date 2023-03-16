import { AddProductEntity } from "../../entities/product/AddProductEntity";
import { ProductEntity } from "../../entities/product/ProductEntity";

export class AddProductUseCase {
  
  async execute(addProduct: Partial<AddProductEntity>): Promise<ProductEntity> {


    if(!addProduct.imageBase64 || !addProduct.mimeType) {
      
    }

    return new ProductEntity();
  }
}