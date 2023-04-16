import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { UserFriendMapper } from "../../dtos/UserFriendMapper";
import { UserFriendEntity } from "../../entities/friend/UserFriendEntity";

export class FindFriendsUseCase {

  /**
   * Recherche liste des amis
   * 
   * @param {string} userId
   * @returns {Promise<Array<UserFriendEntity>> }
   */
  async execute(userId: string): Promise<Array<UserFriendEntity>> {

    const userFriends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(userId);    
    
    return UserFriendMapper.getUserFriendsEntities(userFriends);
  }
}