import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import endPoint from 'src/app/domain/utils/endPoint';
import { AddFriendSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/AddFriendSchema';
import { DeleteFriendSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/DeleteFriendSchema';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';
import { FriendRepositorySchema } from 'src/app/domain/ports/repositoriesSchemas/FriendRepositorySchema';
import { environment } from 'src/environments/environment';
import { FriendArrayResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendArrayResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class FriendRepositoryService implements FriendRepositorySchema {

  constructor(private http: HttpClient) { }

  /**
   * Ajout ami
   * @param {AddFriendSchema} data
   * @returns {Observable<FriendResponseSchema>}
   */
  addFriend(data: AddFriendSchema): Observable<FriendArrayResponseSchema> {
    return this.http.post<FriendArrayResponseSchema>(environment.baseUrl + endPoint.addfriend.url, data);
  }

  /**
   * Récupération amis utilisateur
   * @param {string} userId
   * @returns {Observable<FriendResponseSchema[]>}
   */
  findAllFriendOfUser(userId: string): Observable<FriendResponseSchema[]> {
    return this.http.get<Array<FriendResponseSchema>>(environment.baseUrl + endPoint.findAllFriendsByUserId.url + `${userId}`);
  }

  /**
   * Suppression ami
   * @param {DeleteFriendSchema} data 
   * @returns {Observable<FriendResponseSchema>}
   */
  deleteFriendByRelationId(data: DeleteFriendSchema): Observable<Array<FriendResponseSchema>> {
    return this.http.delete<Array<FriendResponseSchema>>(environment.baseUrl + endPoint.deleteFriend.url, {
      body: {
        userId: data.userId,
        friendId: data.friendId
      }
    })
  }
}
