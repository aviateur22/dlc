import { ImageModel } from "../models/ImageModel";

export class ImageModelMapper {
  
  /**
   * ImageModelMapper 
   * @param {any} data 
   * @returns {ImageModel}
   */
  static getImageModel(data: any): ImageModel {
    return new ImageModel({
      id: data.id.toString(),
      imageBase64: data.image_base64,
      mimeType: data.mime_type,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    })
  }

  /**
   * Array of ImageModel
   * @param {Array<any>} datas 
   * @returns {Array<ImageModel>}
   */
  static getImagesModels(datas: Array<any>): Array<ImageModel> {
    return datas.map(data=>ImageModelMapper.getImageModel(data));
  }
}