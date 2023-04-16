// Core
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// Custom
import { RelationRepositoryService } from "src/app/infra/services/repositoryService/relation.service";
import { FriendResponseSchema } from "../ports/EntitiesSchemas/friend/FriendResponseSchema";
import { RelationResponseSchema } from "../ports/EntitiesSchemas/relation/RelationResponseSchema";

@Injectable({
  providedIn: 'root'
})
export class RefuseFriendRelationUSeCase {

  constructor(
    private relationRepository: RelationRepositoryService
  ) {}

  /**
   * Refus d'ajout d'ami
   * @param {FriendResponseSchema} refuseFriend 
   * @returns {Observable<RelationResponseSchema>}
   */
  execute(refuseFriend: FriendResponseSchema): Observable<RelationResponseSchema> {
    return this.relationRepository.refuseRelation({
      relationId: refuseFriend.relationId,
      friendId: refuseFriend.friendId
    });
  }
}