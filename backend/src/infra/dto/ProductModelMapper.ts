import { ProductModel } from "../models/product/ProductModel";
import { ProductWithImageModel } from "../models/product/ProductWithImageModel";
import { ProductImageModel } from "../models/ProductImageModel";

/**
 * ProductModel mapper
 */
export class ProductModelMapper {

  /**
   * Mapper ProductModel
   * @param {any} data 
   * @returns {ProductModel}
   */
  static getProductModel(data: any): ProductModel {
    return new ProductModel({
      id: data.id.toString(),
      imageId: data.image_id.toString(),
      openDate: data.open_date,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });
  }

  /**
   * Mapper ProductModelArray
   * @param {Array<any>} datas 
   * @returns {Array<ProductModel>}
   */
  static getProductsModel(datas: Array<any>): Array<ProductModel> {
    return datas.map(data=>ProductModelMapper.getProductModel(data));
  }

  /**
   * Mapper ProductWithImageModel
   * @param {Array<any>} datas 
   * @returns {Array<ProductWithImageModel>}
   */
  static getProductWithImageModel(datas: Array<any>): Array<ProductWithImageModel> {
    return datas.map(data => new ProductWithImageModel({
      id: data.id.toString(),
      imageId: data.image_id,
      openDate: data.open_date,
      createdAt: data.created_at,
      updatedAt: data.updated_at    
    }));
  }
}