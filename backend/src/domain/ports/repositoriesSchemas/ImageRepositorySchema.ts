import { ImageModel } from "../../../infra/models/ImageModel";
import { AddImageEntity } from "../../entities/image/AddImageEntity";

export interface ImageRepositorySchema {
  /**
   * Sauvegarde product
   * @param {Partial<AddProductEntity>} product 
   */
  save(image: Partial<AddImageEntity>): Promise<ImageModel>;

  /**
   * FindAll Image
   */
  findAll(): Promise<Array<ImageModel>>

  /**
   * Suppression 
   */
  deleteAll(): Promise<void>;
}