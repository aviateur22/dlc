import { Observable } from "rxjs";
import { FriendResponseSchema } from "../EntitiesSchemas/friend/FriendResponseSchema";
import { AddFriendSchema } from "../EntitiesSchemas/friend/AddFriendSchema";
import { DeleteFriendSchema } from "../EntitiesSchemas/friend/DeleteFriendSchema";

export interface FriendRepositorySchema  {

  /**
   * Ajout ami
   * @param {AddFriendSchema} data
   * @returns {Observable<FriendResponseSchema>}
   */
  addFriend(data: AddFriendSchema): Observable<FriendResponseSchema>;

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
  deleteFriendByRelationId(data: DeleteFriendSchema): Observable<FriendResponseSchema>
}