import { FriendRepositoryService } from "src/app/infra/services/repositoryService/friend-repository.service";
import { AddFriendSchema } from "../ports/EntitiesSchemas/friend/AddFriendSchema";
import { AddFriendService } from "src/app/infra/services/useCaseService/add-friend.service";
import { Injectable } from "@angular/core";

/**
 * Ajout d'un ami
 */
@Injectable({
  providedIn: 'root'
})
export class AddFriendUseCase {

  constructor(
    private friendService: FriendRepositoryService,
    private addFriendService: AddFriendService
  ) {}

  /**
   * Ajout ami
   * @param {AddFriendSchema} data 
   */
  execute(data: AddFriendSchema) {
    this.friendService.addFriend(data).subscribe(addFriendResponse=>{

      if(addFriendResponse) {
        this.addFriendService.updateAddFriend(addFriendResponse);
      }
    });
  }
}