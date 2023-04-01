import { AcceptFriendRelationUseCase } from "../../../useCases/relation/AcceptFriendRelationUseCase";
import { AddFriendUseCase } from "../../../useCases/friend/AddFriendUseCase";
import { DeleteFriendUseCase } from "../../../useCases/friend/DeleteFriendUseCase";
import { FindFriendsUseCase } from "../../../useCases/friend/FindFriendsUseCase";

/**
 * UseCases gestion Friend
 */
export class FriendUseCase {
  readonly addFriendUseCase = new AddFriendUseCase();
  readonly deleteFriendUseCase = new DeleteFriendUseCase();  
  readonly findFriendsUseCase = new FindFriendsUseCase();
}