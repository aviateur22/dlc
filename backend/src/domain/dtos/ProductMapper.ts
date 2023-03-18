import { ProductEntity } from "../entities/product/ProductEntity";

export class ProductMapper {
  /**
   * Mapper vers ProductEntity
   * @param { ProductModel } product 
   * @returns { ProductEntity }
   */
  static getProductEntity(product: Partial<ProductEntity>): ProductEntity {
    return new ProductEntity({...product});
  }
}