import { AcceptFriendRelationUseCase } from "../../../useCases/relation/AcceptFriendRelationUseCase";
import { FindNewRelationUseCase } from "../../../useCases/relation/FindNewRelationUseCase";
import { RefuseFriendRelationUseCase } from "../../../useCases/relation/RefuseFriendRelationUseCase";

/**
 * UseCases gestion Friend
 */
export class RelationUseCase {
  readonly acceptFriendRelationUseCase = new AcceptFriendRelationUseCase();
  readonly refuseFriendRelationUseCase = new RefuseFriendRelationUseCase();
  readonly findNewRelationUseCase = new FindNewRelationUseCase();
}