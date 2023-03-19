import { AddImageEntity } from "../../../domain/entities/image/AddImageEntity";
import { ImageRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ImageRepositorySchema";
import { ImageModel } from "../../models/ImageModel";

export class InMemoryImagerepository implements ImageRepositorySchema {
  // Images
  private images: Array<ImageModel> = [];

  /**
   * DeleteById
   * @param {string} id 
   * @returns {Promise<ImageModel|null>}
   */
  async deleteById(id: string): Promise<ImageModel|null> {    
    const index: number = this.images.findIndex(image=> image.id === id);    

    if(index < 0) {
      return null;
    }

    const image = this.images.find(image=>image.id === id);
    
    // Suppression de la todo
    this.images.splice(index, 1);

    return typeof image === 'undefined' ? null : image;
  }

  /**
   * Save Image
   * @param {Partial<AddImageEntity>} image 
   */
  async save(image: AddImageEntity): Promise<ImageModel|null> {    
    // Index
    const index: number = this.images.length === 0 ? 1 : Math.max(...this.images.map(x=>Number(x.id))) + 1;

    this.images.push( { id: index.toString(), ...image});

    return {id: index.toString(), ...image}
  }

  /**
   * FindAll
   * @returns {Promise<ImageModel[]>}
   */
  async findAll(): Promise<ImageModel[]> {
    return this.images;
  }

  /**
   * DeleteAll
   */
  async deleteAll(): Promise<void> {
    this.images = [];
  }

}