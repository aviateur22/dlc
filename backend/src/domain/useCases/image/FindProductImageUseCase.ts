import { ImageNotFindException } from "../../../exceptions/ImageNotFindException";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageMapper } from "../../dtos/ImageMapper";
import { ImageEntity } from "../../entities/image/imageEntity";
import messages from "../../messages/messages";

export class FindProductImageUseCase {

  /**
   * Recherche Image
   * @param imageId 
   * @returns 
   */
  async execute(imageId: string): Promise<ImageEntity| null> {
    const base64Image = await RepositoryServiceImpl.getRepository().imageRepository.findProductImageById(imageId);

    if(!base64Image) {
      throw new ImageNotFindException(messages.message.productImageMissing)
    }

    return ImageMapper.getProductImageEntity(base64Image);
  }
}