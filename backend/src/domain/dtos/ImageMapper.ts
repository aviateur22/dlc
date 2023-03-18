import { ImageModel } from "../../infra/models/ImageModel";
import { ImageEntity } from "../entities/image/ImageEntity";

export class ImageMapper {
  /**
   * Mapper TodoModel vers  TodoEntity
   * @param { ImageModel } image 
   * @returns { ImageEntity }
   */
  static getImageEntity(image: ImageModel): ImageEntity {
    return new ImageEntity(image.id);
  }
}