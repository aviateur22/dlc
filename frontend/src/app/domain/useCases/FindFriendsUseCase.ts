import { Injectable } from "@angular/core";
import { FriendRepositoryService } from "src/app/infra/services/repositoryService/friend-repository.service";
import { FindFriendsService } from "src/app/infra/services/useCaseService/find-friends.service";
import { SessionInformation } from "../helpers/SessionInformation";

/**
 * Récupération des amis d'un utilisateur
 */
@Injectable({
  providedIn: 'root'
})
export class FindFriendsUseCase {
  constructor(
    private friendService: FriendRepositoryService,
    private findFriendService: FindFriendsService,
    private sessionInformation: SessionInformation
  ) {}

  /**
   * Récupération liste d'ami 
   */
  execute() {
    const userId: string = this.sessionInformation.getUserInformation().userId;

    // Récupération friends
    this.friendService.findAllFriendOfUser(userId).subscribe(findFriendsResponse=>{      
      if(findFriendsResponse) {
        this.findFriendService.updateFindFriends(findFriendsResponse);
      }
    })
  } 
}