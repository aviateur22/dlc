import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";

export class ProductUserGenerator {

  /**
   * Supp. ProductUser
   */
  static async deleteProductUser(): Promise<void> {
    await RepositoryServiceImpl.getRepository().productUserRepository.deleteAll();
  }
}