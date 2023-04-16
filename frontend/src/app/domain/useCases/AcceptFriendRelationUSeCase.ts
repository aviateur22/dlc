import { Injectable } from "@angular/core";
import { RelationRepositoryService } from "src/app/infra/services/repositoryService/relation.service";
import { FriendResponseSchema } from "../ports/EntitiesSchemas/friend/FriendResponseSchema";
import { Observable } from "rxjs";
import { RelationResponseSchema } from "../ports/EntitiesSchemas/relation/RelationResponseSchema";

@Injectable({
  providedIn: 'root'
})
export class AcceptFriendRelationUSeCase {

  constructor(private relationService: RelationRepositoryService) {}

  /**
   * Ajout d'un nouvel ami
   * @param {FriendResponseSchema} acceptedFriend 
   * @returns {Observable<RelationResponseSchema>}
   */
  execute(acceptedFriend: FriendResponseSchema): Observable<RelationResponseSchema> {
    return this.relationService.acceptRelation(acceptedFriend)
  }
}