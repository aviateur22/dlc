import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";

export class ImageGenerator {
  /**
   * Supp. image
   */
  static async deleteImage(): Promise<void> {
    await RepositoryServiceImpl.getRepository().imageRepository.deleteAll();
  }
}