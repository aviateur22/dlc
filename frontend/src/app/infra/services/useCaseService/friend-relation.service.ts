import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';
import { AcceptFriendRelationUSeCase } from 'src/app/domain/useCases/AcceptFriendRelationUSeCase';
import { RefuseFriendRelationUSeCase } from 'src/app/domain/useCases/RefuseFriendRelationUSeCase';
import { FindFriendsUseCase } from 'src/app/domain/useCases/FindFriendsUseCase';
import { FindNewFriendsUseCase } from 'src/app/domain/useCases/FindNewFriendsUseCase';
import { DeleteFriendUseCase } from 'src/app/domain/useCases/DeleteFriendUseCase';
import { AddFriendUseCase } from 'src/app/domain/useCases/AddFriendUseCase';
import { SessionInformation } from 'src/app/domain/helpers/SessionInformation';

@Injectable({
  providedIn: 'root'
})
export class FriendRelationService {

  // Liste nouvelle relation
  private _newFriendsSchema!: Array<FriendResponseSchema>;
  private _newFriends = new BehaviorSubject(this._newFriendsSchema)
  public readonly newFriends:  Observable<Array<FriendResponseSchema>> = this._newFriends.asObservable();

  // Liste amis accéptés
  private _friendsSchema!: Array<FriendResponseSchema>;
  private _friends = new BehaviorSubject(this._friendsSchema)
  public readonly friends:  Observable<Array<FriendResponseSchema>> = this._friends.asObservable();

  constructor(
    private sessionInfomation: SessionInformation,
    private acceptRelationUseCase: AcceptFriendRelationUSeCase,
    private refuseRelationUSeCase: RefuseFriendRelationUSeCase,
    private findFriendsUseCase: FindFriendsUseCase,
    private findNewFriendsUseCase: FindNewFriendsUseCase,
    private deleteFriendUseCase: DeleteFriendUseCase,
    private addFriendUseCase: AddFriendUseCase

  ) { }

  /**
   * Ajout nouvel ami
   * @param {string} friendEmail 
   */
  addNewFriend(friendEmail: string) {
    
    const obs = this.addFriendUseCase.execute({
      userId: this.sessionInfomation.getUserInformation().userId,
      friendEmail: friendEmail,
      friendName: 'tbc'
    });

    obs.subscribe(addFriendResponse=>{
      const updateFriendArray = this._friends.getValue();
      updateFriendArray.push(addFriendResponse.friends[0]);      
      this._friends.next(updateFriendArray);
    })
  }

  /**
   * Ajout relation
   * @param {FriendResponseSchema} friend
   */
  acceptFriendRelation(friend: FriendResponseSchema) {
    this.acceptRelationUseCase.execute(friend).subscribe({
      next: AddRelationResponse=>{
        if(AddRelationResponse) {

          // Mise a jour newFriendList
          const newRelationsList = this._newFriends.getValue().filter(newFriend=>newFriend.relationId !== friend.relationId);

          // Mise a jour friendList
          const friendsList = this._friends.getValue();          
          friendsList.push(friend);
          
          this._friends.next(friendsList);
          this._newFriends.next(newRelationsList);
        }
      }
    });
  }

  /**
   * Refus d'ajout d'une relation
   * @param {riendResponseSchema} deleteFriend
   */
  refuseFriendRelation(deleteFriend: FriendResponseSchema) {

    this.refuseRelationUSeCase.execute(deleteFriend).subscribe({
      next: refuseRelationResponse=> {
        if(refuseRelationResponse) {

          // Mise a jour newFriendList
          const newRelationsList = this._newFriends.getValue().filter(newFriend=>newFriend.relationId !== deleteFriend.relationId);
          this._newFriends.next(newRelationsList);
        }
      }
    });    
  }

  /**
   * Recherche des nouvelles relations
   */
  findNewFriendRelation(): Observable<Array<FriendResponseSchema>> {
    const obs = this.findNewFriendsUseCase.execute();

    obs.subscribe(newFriends=>{
      console.log(newFriends);
      this._newFriends.next(newFriends);
    });

    return obs;
  }

  /**
   * Recherche des amis d'un utilisateur
   */
  findUserAcceptedFriends(): Observable<Array<FriendResponseSchema>> {
    let obs = this.findFriendsUseCase.execute();

    obs.subscribe(
      friends=>{
        this._friends.next(friends);      
    })

    return obs;
  }

  /**
   * Suppression d'un ami
   * @param {FriendResponseSchema} deleteFriend
   */
  deleteOneFriend(deleteFriend: FriendResponseSchema) {
    const obs = this.deleteFriendUseCase.execute(deleteFriend);

    // Mise a jour liste ami
    obs.subscribe(res=>{     
      let updateArray = this._friends.getValue();
      updateArray = updateArray.filter(friends=>friends.relationId !== deleteFriend.relationId);
      this._friends.next(updateArray);
    })
  }

}
