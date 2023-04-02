// Core
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Custom
import { SessionInformation } from 'src/app/domain/helpers/SessionInformation';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';
import { AddFriendUseCase } from 'src/app/domain/useCases/AddFriendUseCase';
import { FindFriendsUseCase } from 'src/app/domain/useCases/FindFriendsUseCase';
import { AddFriendService } from 'src/app/infra/services/useCaseService/add-friend.service';
import { FindFriendsService } from 'src/app/infra/services/useCaseService/find-friends.service';
import url from 'src/app/domain/utils/url';
import { FriendRelationService } from 'src/app/infra/services/useCaseService/friend-relation.service';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {

  // Liste des relations amis accépté
  friends: Array<FriendResponseSchema> = [];

  // Liste des nouvelles relation
  newFriendRelations: Array<FriendResponseSchema> = [];

  constructor(
   private router: Router,
   private findFriendsUseCase: FindFriendsUseCase,
   private findFriendService: FindFriendsService,
   private addFriendUseCase: AddFriendUseCase,
   private addFriendService: AddFriendService,
   private sessionInformation: SessionInformation,
   private friendService: FriendRelationService
  ) {}

  ngOnInit(){
    //this.loadUserFriends();   

    // this.friendService.acceptedFriendsObservable.subscribe({
    //   next: d=>{
    //     console.log(d)
    //     this.friends = d
    //   }
    // });
    this.friendService.findUserAcceptedFriends();
    this.friendService.friends.subscribe(res=>this.friends = res);


    // this.friendService.acceptedFriendsObservable.subscribe({
    //   next: friendsResponse=>{
    //     console.log(friendsResponse)
    //     this.friends = friendsResponse;
    //   }
    // })
  }

  /**
   * Chartgement liste amis
   */
  loadUserFriends() {
    this.findFriendsUseCase.execute();

 

    this.findFriendService.findFriendsResponseObservable.subscribe(findFriendsResponse=>{
      if(findFriendsResponse) {
        this.friends = findFriendsResponse
      }
    });
  }

  /**
   * Ajout ami
   * @param {string} friendEmail
   */
  addFriend(friendEmail: string) {
    this.friendService.addNewFriend(friendEmail);

    // this.addFriendUseCase.execute({
    //   userId: this.sessionInformation.getUserInformation().userId,
    //   friendEmail: friendEmail,
    //   friendName: 'tbc'
    // });

    // this.addFriendService.addFriendResponseObservable.subscribe(addFriendResponse=>{
    //   if(addFriendResponse) {
    //     this.friends.push(addFriendResponse);
    //   }
    // });
  }

  /**
   * Acceptation relation ami
   */
  acceptFriendReltion() {

  }

  /**
   * Refus relation ami
   */
  refuseFriendRelation() {

  }

  /**
   * Retour page utilisateur
   */
  navigateToUserAccount() {
    this.router.navigate([url.userAccount]);
  }
}
