import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { UserFriendMapper } from "../../dtos/UserFriendMapper";
import { UserFriendEntity } from "../../entities/friend/UserFriendEntity";

export class FindNewRelationUseCase {

  async execute(userId: string): Promise<Array<UserFriendEntity>> {
    // Recherche des nouvelle relation
    const newFriendRelation = await RepositoryServiceImpl.getRepository().relationRepository.findNewRelationByUserId(userId);
    
    return UserFriendMapper.getUserFriendsEntities(newFriendRelation);
  }
}