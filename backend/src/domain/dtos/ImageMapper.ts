import { ImageModel } from "../../infra/models/ImageModel";
import { ImageBase64Entity } from "../entities/image/ImageBase64Entity";
import { ImageIdEntity } from "../entities/image/ImageIdEntity";

export class ImageMapper {
  /**
   * Mapper vers ImageId
   * @param { ImageModel } image 
   * @returns { ImageIdEntity }
   */
  static getImageWithIdEntity(image: ImageModel): ImageIdEntity {
    return new ImageIdEntity(image.id);
  }

  /**
   * Mapper ImageBase64
   * @param {ImageModel} image 
   * @returns { ImageBase64Identity}
   */
  static getFullImageEntity(image: ImageModel): ImageBase64Entity {
    return new ImageBase64Entity({...image});
  }
}