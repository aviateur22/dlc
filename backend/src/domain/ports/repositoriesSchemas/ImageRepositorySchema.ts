import { ImageModel } from "../../../infra/models/ImageModel";
import { AddImageEntity } from "../../entities/image/AddImageEntity";

export interface ImageRepositorySchema {
  /**
   * Sauvegarde product
   * @param {Partial<AddProductEntity>} image 
   */
  save(image: Partial<AddImageEntity>): Promise<ImageModel>;

  /**
   * FindAll Image
   */
  findAll(): Promise<Array<ImageModel>>

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