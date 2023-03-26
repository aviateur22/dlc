import { AcceptFriendRelationUseCase } from "../../../useCases/relation/AcceptFriendRelationUseCase";
import { AddFriendUseCase } from "../../../useCases/friend/AddFriendUseCase";
import { DeleteFriendUseCase } from "../../../useCases/friend/DeleteFriendUseCase";

/**
 * UseCases gestion Friend
 */
export class FriendUseCase {
  readonly addFriendUseCase = new AddFriendUseCase();
  readonly deleteFriendUseCase = new DeleteFriendUseCase();  
}