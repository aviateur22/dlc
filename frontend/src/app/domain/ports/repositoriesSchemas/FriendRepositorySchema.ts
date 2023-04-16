import { Observable } from "rxjs";
import { FriendResponseSchema } from "../EntitiesSchemas/friend/FriendResponseSchema";
import { AddFriendSchema } from "../EntitiesSchemas/friend/AddFriendSchema";
import { DeleteFriendSchema } from "../EntitiesSchemas/friend/DeleteFriendSchema";
import { FriendArrayResponseSchema } from "../EntitiesSchemas/friend/FriendArrayResponseSchema";

export interface FriendRepositorySchema  {

  /**
   * Ajout ami
   * @param {AddFriendSchema} data
   * @returns {Observable<FriendResponseSchema>}
   */
  addFriend(data: AddFriendSchema): Observable<FriendArrayResponseSchema>;

  /**
   * Récupération amis utilisateur
   * @param {string} userId
   * @returns {Observable<FriendResponseSchema[]>}
   */
  findAllFriendOfUser(userId: string): Observable<Array<FriendResponseSchema>>;

   /**
   * Suppression ami
   * @param {DeleteFriendSchema} data 
   * @returns {Observable<FriendResponseSchema>}
   */
  deleteFriendByRelationId(data: DeleteFriendSchema): Observable<Array<FriendResponseSchema>>
}