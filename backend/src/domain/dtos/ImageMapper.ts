import { ImageModel } from "../../infra/models/ImageModel";
import { ProductImageModel } from "../../infra/models/ProductImageModel";
import { ImageBase64Entity } from "../entities/image/ImageBase64Entity";
import { ImageEntity } from "../entities/image/imageEntity";
import { ImageIdEntity } from "../entities/image/ImageIdEntity";
import { ProductImageEntity } from "../entities/product/ProductImageEntity";

export class ImageMapper {

  /**
   * Image
   * @param image 
   * @returns 
   */
  static getProductImageEntity(image: ProductImageModel): ImageEntity {
    return new ImageEntity(image.id, image.imageBase64, image.mimeType);
  }

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