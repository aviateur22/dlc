import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { ImageMapper } from "../../dtos/ImageMapper";
import { AddImageEntity } from "../../entities/image/AddImageEntity";
import { ImageIdEntity } from "../../entities/image/ImageIdEntity";
import { UseCaseModel } from "../UseCaseModel";

/**
 * AddImageUseCase
 */
export class AddImageUseCase extends UseCaseModel {

  /**
   * AddImage
   * @param {Partial<AddImageEntity>} addImage 
   */
  async execute(addImage: Partial<AddImageEntity>): Promise<ImageIdEntity> {
    // Ajout du produit
    const image = await this.repositories.imageRepository.save(new AddImageEntity({...addImage}));
   
    if(!image) {
      throw new ErrorDatabaseException('error database');
    }

    return ImageMapper.getImageWithIdEntity({...image});
  }
}