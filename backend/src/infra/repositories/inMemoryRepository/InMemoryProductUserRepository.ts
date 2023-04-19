import { AddProductUserEntity } from "../../../domain/entities/productUser/AddProductUserEntity";
import { ProductUserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductUserRepositorySchema";
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
   * Recherche ProductUser par user et owner
   * @param {string} userId 
   * @param {string} ownerId
   * @returns {Promise<Array<ProductUserModel>>} 
   */
  async findByUserIdAndOwnerId(userId: string): Promise<ProductUserModel[]> {
    return this.productsUsers.filter(product=>(product.userId === userId));
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
   * Suppression de plusieurs relations produit-utilisateur
   * @param {Array<string>} productIdArray
   * @param {string} userId
   */
  async deleteMultipleProductsByUserId(productIdArray: string[], userId: string): Promise<void> {
    this.productsUsers = this.productsUsers.filter(product=>(!productIdArray.includes(product.productId) && product.userId !== userId));
  }

  /**
   * Supprssion de plusieurs relation produit-utilisateur
   * @param {string} productId 
   * @param {Array<string>} userIdArray
   */
  async deleteOneProductForMultipleUsers(productId: string, userIdArray: string[]): Promise<void> {    
    this.productsUsers = this.productsUsers.filter(product=>(product.productId !== productId || !userIdArray.includes(product.userId)));   
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