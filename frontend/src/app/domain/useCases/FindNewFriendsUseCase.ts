import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FriendResponseSchema } from "../ports/EntitiesSchemas/friend/FriendResponseSchema";
import { RelationRepositoryService } from "src/app/infra/services/repositoryService/relation.service";
import { SessionInformation } from "../helpers/SessionInformation";

@Injectable({
  providedIn: 'root'
})
export class FindNewFriendsUseCase  {

  constructor(
    private relationService: RelationRepositoryService,
    private sessionInformation: SessionInformation
  ) { }

  /**
   * Recherche des nouvelles relations 
   * @returns {Observable<Array<FriendResponseSchema>>}
   */
  execute(): Observable<Array<FriendResponseSchema>> {
    // Id utilisateur
    const userId = this.sessionInformation.getUserInformation().userId;

    return this.relationService.findNewRelation({
      userId
    });
  }
}