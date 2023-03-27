import { AcceptFriendRelationUseCase } from "../../../useCases/relation/AcceptFriendRelationUseCase";
import { RefuseFriendRelationUseCase } from "../../../useCases/relation/RefuseFriendRelationUseCase";

/**
 * UseCases gestion Friend
 */
export class RelationUseCase {
  readonly acceptFriendRelationUseCase = new AcceptFriendRelationUseCase();
  readonly refuseFriendRelationUseCase = new RefuseFriendRelationUseCase();
}