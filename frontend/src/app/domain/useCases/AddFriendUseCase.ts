import { FriendRepositoryService } from "src/app/infra/services/repositoryService/friend-repository.service";
import { AddFriendSchema } from "../ports/EntitiesSchemas/friend/AddFriendSchema";
import { AddFriendService } from "src/app/infra/services/useCaseService/add-friend.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FriendResponseSchema } from "../ports/EntitiesSchemas/friend/FriendResponseSchema";
import { FriendArrayResponseSchema } from "../ports/EntitiesSchemas/friend/FriendArrayResponseSchema";

/**
 * Ajout d'un ami
 */
@Injectable({
  providedIn: 'root'
})
export class AddFriendUseCase {

  constructor(
    private friendService: FriendRepositoryService,
  ) {}

  /**
   * Ajout d'un ami
   * @param {AddFriendSchema} data 
   */
  execute(data: AddFriendSchema): Observable<FriendArrayResponseSchema> {    
    return this.friendService.addFriend(data);
  }
}