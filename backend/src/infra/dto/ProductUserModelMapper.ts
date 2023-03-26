import { ProductUserModel } from "../models/productUser/ProductUserModel";

/**
 * Mapper ProductUser
 *
 */
export class ProductUserModelMapper {

  /**
   * Mapper ProductUserModel
   * @param {any} data
   * @returns {ProductUserModel} 
   */
  static getProductUserModel(data: any): ProductUserModel {
    return new ProductUserModel({
      id: data.id.toString(),
      userId: data.user_id,
      productId: data.product_id,
      ownerId: data.owner_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });
  }

  /**
   * Mapper ProductUsersModels
   * @param {Array<any>} datas 
   * @returns {Array<ProductUserModel>}
   */
  static getProductsUsersModel(datas: Array<any>): Array<ProductUserModel> {
    return datas.map(data=>ProductUserModelMapper.getProductUserModel(data));
  }
}