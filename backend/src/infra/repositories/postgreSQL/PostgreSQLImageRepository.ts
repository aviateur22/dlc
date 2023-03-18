import { AddImageEntity } from "../../../domain/entities/image/AddImageEntity";
import { ImageRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ImageRepositorySchema";
import { ImageModel } from "../../models/ImageModel";
import client from "./connexion/databaseConnexion";

export class PostgreSQLImageRepository implements ImageRepositorySchema { 

  /**
   * Save Image
   * @param {Partial<AddImageEntity>} image 
   * @returns {Promise<ImageModel>}
   */
  async save(image: Partial<AddImageEntity>): Promise<ImageModel> {
    const addImage = await client.query('INSERT INTO "image" ("image_base64", "mime_type", "created_at", "updated_at") VALUES ($1, $2, $3, $4) returning *', [ 
      image.imageBase64, image.mimeType, image.createdAt, image.updatedAt
    ])
    
    return addImage.rows.shift();    
  }

  /**
   * FindAll
   * @returns {Promise<ImageModel[]>}
   */
  async findAll(): Promise<ImageModel[]> {
    const images = await client.query('SELECT * FROM "image"');
    return images.rows;
  }

  /**
   * DeleteById
   * @param id
   * @returns  {Promise<ImageModel|null>}
   */
   async deleteById(id: string): Promise<ImageModel|null> {
    const delteImage = await client.query('DELETE FROM "image" WHERE id=$1 returning *', [id]);
    return delteImage.rowCount > 0 ? delteImage.rows.shift() : null;
  }
  
  /**
   * DeleteAll Image
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "image" RESTART IDENTITY CASCADE');
  }
  
}