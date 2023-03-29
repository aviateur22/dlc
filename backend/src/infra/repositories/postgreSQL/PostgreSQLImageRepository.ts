import { AddImageEntity } from "../../../domain/entities/image/AddImageEntity";
import { ImageRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ImageRepositorySchema";
import { ImageModelMapper } from "../../dto/ImageModelMapper";
import { ImageModel } from "../../models/ImageModel";
import { ProductImageModel } from "../../models/ProductImageModel";
import client from "./connexion/databaseConnexion";

export class PostgreSQLImageRepository implements ImageRepositorySchema { 

  /**
   * Save Image
   * @param {Partial<AddImageEntity>} image 
   * @returns {Promise<ImageModel>}
   */
  async save(image: Partial<AddImageEntity>): Promise<ImageModel|null> {
    const addImage = await client.query('INSERT INTO "image" ("image_base64", "mime_type", "created_at", "updated_at") VALUES ($1, $2, $3, $4) returning *', [ 
      image.imageBase64, image.mimeType, image.createdAt, image.updatedAt
    ]).then(result=>{

      // Errueur sauvgarde
      if(result.rowCount === 0) {
        return null;
      }

      return ImageModelMapper.getImageModel(result.rows.shift());
    });
    
    return addImage;    
  }

  /**
   * FindAll
   * @returns {Promise<ImageModel[]>}
   */
  async findAll(): Promise<ImageModel[]> {
    const images = await client.query('SELECT * FROM "image"').then(result=>{

      return ImageModelMapper.getImagesModels(result.rows);
    });

    return images;
  }

  /**
   * DeleteById
   * @param id
   * @returns  {Promise<ImageModel|null>}
   */
   async deleteById(id: string): Promise<ImageModel|null> {
    const delteImage = await client.query('DELETE FROM "image" WHERE id=$1 returning *', [id]).then(result=>{

      // Errueur sauvgarde
      if(result.rowCount === 0) {
        return null;
      }

      return ImageModelMapper.getImageModel(result.rows.shift());
    });
    return delteImage;
  }
  
  /**
   * DeleteAll Image
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "image" RESTART IDENTITY CASCADE');
  }

  /**
   * Trouve productImage
   * @param imageId 
   */
  async findProductImageById(imageId: string): Promise<ProductImageModel | null> {
    const image = await client.query('SELECT "image_base64" FROM "image" WHERE id=$1', [
      imageId
    ]).then(result=>{

      if(result.rowCount === 0) {
        return null;
      }

      return ImageModelMapper.getProductImage(result.rows.shift());
    });

    return image;
  }
  
}