import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FriendResponseSchema } from "../ports/EntitiesSchemas/friend/FriendResponseSchema";
import { FriendRepositoryService } from "src/app/infra/services/repositoryService/friend-repository.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteFriendUseCase {

  constructor(
    private friendRepository: FriendRepositoryService
  ) {}

  /**
   * Supprression d'un ami
   * 
   * @param {FriendResponseSchema} deleteFriend
   */
  execute(deleteFriend: FriendResponseSchema): Observable<Array<FriendResponseSchema>>{    
    return this.friendRepository.deleteFriendByRelationId(deleteFriend)
  }
}