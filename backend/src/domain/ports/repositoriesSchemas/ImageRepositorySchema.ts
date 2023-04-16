import { ImageModel } from "../../../infra/models/ImageModel";
import { ProductImageModel } from "../../../infra/models/ProductImageModel";
import { AddImageEntity } from "../../entities/image/AddImageEntity";

export interface ImageRepositorySchema {
  /**
   * Sauvegarde product
   * @param {Partial<AddProductEntity>} image 
   */
  save(image: Partial<AddImageEntity>): Promise<ImageModel|null>;

  /**
   * FindAll Image
   */
  findAll(): Promise<Array<ImageModel>>

  /**
   * Récuperation image
   * @param {string} imageId 
   */
  findProductImageById(imageId: string): Promise<ProductImageModel|null>

  /**
   * DeleteById
   * @param {number} id
   */
  deleteById(id: string): Promise<ImageModel|null>;

  /**
   * Suppression 
   */
  deleteAll(): Promise<void>;
}