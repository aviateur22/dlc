import { AddProductUserEntity } from "../../../domain/entities/productUser/AddProductUserEntity";
import { ProductUserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductUserRepositorySchema";
import { ProductUserByUserModel } from "../../models/productUser/ProductUserByUserModel";
import { ProductUserModel } from "../../models/productUser/ProductUserModel";

export class InMemoryProductUserRepository implements ProductUserRepositorySchema {
  
  private productsUsers: Array<ProductUserModel>=[];
  /**
   * Save
   * @param {Partial<AddProductUserEntity>} productUser 
   */
  async save(productUser: AddProductUserEntity): Promise<ProductUserModel|null> {
    // Index
    const index: number = this.productsUsers.length === 0 ? 1 : Math.max(...this.productsUsers.map(x=>Number(x.id))) + 1;

    this.productsUsers.push({id: index.toString(), ...productUser});
    return {id: index.toString(), ...productUser};
  }

  /**
   * findAll
   */
  async findAll(): Promise<ProductUserModel[]> {
    return this.productsUsers;
  }

  /**
   * FindyUserId
   * @param {string} userId
   * @returns {Promise<Array<ProductUserModel>>}
   */
  async findByUserId(userId: string): Promise<Array<ProductUserModel>> {
    return this.productsUsers.filter(product=>product.userId === userId);
  }

  /**
   * FindByUserIDProductId
   * @param {string} userId 
   * @param {string} productId 
   * @returns {Promise<ProductUserModel>}
   */
  async findByUserIdAndProductId(userId: string, productId: string): Promise<Array<ProductUserModel>> {
    return this.productsUsers.filter(product=>(product.productId === productId && product.userId === userId));
    
  }

  /**
   * DeleteAll
   */
  async deleteAll(): Promise<void> {
    this.productsUsers = [];
  }

  /**
   * DeleteByProductId
   */
  async deleteByProductId(productId: string): Promise<void> {
    // Recherche de l'index
    const index: number = this.productsUsers.findIndex(product=> product.id === productId);

    if(index < 0) {
      return;
    }

    const findProduct = this.productsUsers.find(product=>product.id === productId);

    // Suppression de la todo
    this.productsUsers.splice(index, 1);
  }
}