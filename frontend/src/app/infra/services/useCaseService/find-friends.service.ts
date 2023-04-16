import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class FindFriendsService {

    // Schema response
    private findFriendsSchema!: Array<FriendResponseSchema>;

    // Rxjs
    private findFriendsResponse = new BehaviorSubject(this.findFriendsSchema);
    public findFriendsResponseObservable = this.findFriendsResponse.asObservable();
   
   /**
   * Mise a jour 
   * @param {FriendResponseSchema} findFriendsResponse 
   */
   updateFindFriends(findFriendsResponse: Array<FriendResponseSchema>): void {
     this.findFriendsResponse.next(findFriendsResponse);     
   }
}
