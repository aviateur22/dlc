import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';
import { FindFriendsUseCase } from 'src/app/domain/useCases/FindFriendsUseCase';
import url from 'src/app/domain/utils/url';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {

  friends: Array<FriendResponseSchema> = [];

  constructor(
   private router: Router,
   private findFriendsUseCase: FindFriendsUseCase
  ) {}

  ngOnInit(){
    this.loadUserFriends();
  }

  /**
   * Chartgement liste amis
   */
  loadUserFriends() {
    this.findFriendsUseCase.execute();
  }

  /**
   * Ajout ami
   */
  addFriend() {

  }

  /**
   * Retour page utilisateur
   */
  navigateToUserAccount() {
    this.router.navigate([url.userAccount]);
  }
}
