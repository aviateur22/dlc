import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

  // Schema response
  private addFriendSchema!: FriendResponseSchema;

  // Rxjs
  private addFriendResponse = new BehaviorSubject(this.addFriendSchema);
  public addFriendResponseObservable = this.addFriendResponse.asObservable();
 
 /**
 * Mise a jour 
 * @param {FriendResponseSchema} FriendResponse 
 */
 updateAddFriend(FriendResponse: FriendResponseSchema): void {
   this.addFriendResponse.next(FriendResponse);     
 }
}
