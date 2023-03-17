import { AddImageEntity } from "../../entities/image/AddImageEntity";
import { ImageEntity } from "../../entities/image/ImageEntity";

/**
 * AddImageUseCase
 */
export class AddImageUseCase {

  /**
   * AddImage
   * @param {Partial<AddImageEntity>} addImage 
   */
  async execute(addImage: Partial<AddImageEntity>): Promise<ImageEntity> {
    return new ImageEntity('A')
  }
}