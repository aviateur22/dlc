import { AddFriendEntity } from "../../../domain/entities/friend/AddFriendEntity";
import { DeleteFriendEntity } from "../../../domain/entities/friend/DeleteFriendEntity";
import { UserFriendRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserFriendRepositorySchema";
import { UserFriendModelMapper } from "../../dto/UserFriendModelMapper";
import { UserFriendModel } from "../../models/userFriend/UserFriendModel";
import client from './connexion/databaseConnexion'

export class PostgreSQLUserFriendRepository implements UserFriendRepositorySchema {  

  /**
   * Ajout d'un Friend
   * @param {AddFriendEntity} addFriend 
   * @returns {Promise<UserFriendModel>}
   */
  async addFriend(addFriend: AddFriendEntity): Promise<UserFriendModel> {
    const friend = await client.query('INSERT INTO "friend_user" ("user_id", "friend_id", "friend_name", "created_at", "updated_at") VALUES ($1, $2, $3, $4 ,$5) returning *', [
      addFriend.userId, addFriend.friendId, addFriend.friendName, addFriend.createdAt, addFriend.updatedAt
    ]).then(result=>{

      // Pas de données
      if(result.rowCount === 0) {
        return null;
      }
      
      // Data
      const data = result.rows.shift();
      return UserFriendModelMapper.getUserFriendModel(addFriend.friendEmail, data);
    });

    return friend!;
  }

  /**
   * Recerche de tous les amis d'une personne
   * @param {string} userId 
   * @returns {Promise<Array<UserFriendModel>>}
   */
  async findAllFriendByUserId(userId: string): Promise<UserFriendModel[]> {
    const friends = await client.query(`
    SELECT 
    "friend_user".id AS id,
    "friend_user".user_id AS user_id,
    "friend_user".friend_id AS friend_id,
    "user".email AS friend_email,
    "friend_user".friend_name AS friend_name,
    "friend_user".created_at AS created_at, 
    "friend_user".updated_at AS updated_at
    FROM "friend_user"
    JOIN "user" ON "friend_user".friend_id = "user".id
    WHERE user_id=$1`, [
      userId
    ]).then(results=>{
      return UserFriendModelMapper.getUserFriendsModel(results.rows);      
    });

    return friends;
  }

  /**
   * Recherche de 1 friend
   * @param {{userId: string, friendId: string}} findFriend
   * @returns {Promise<UserFriendModel>}
   */
  async findOneFriendByUserId(findFriend: { userId: string; friendId: string; }): Promise<UserFriendModel|null> {
    const findOneFriend = await client.query(`
    SELECT 
    "friend_user".id AS id,
    "friend_user".user_id AS user_id,
    "friend_user".friend_id AS friend_id,
    "user".email AS friend_email,
    "friend_user".friend_name AS friend_name,
    "friend_user".created_at AS created_at, 
    "friend_user".updated_at AS updated_at
    FROM "friend_user"
    JOIN "user" ON "friend_user".friend_id = "user".id
    WHERE user_id=$1 AND friend_id =$2`,[
      findFriend.userId, findFriend.friendId
    ]).then(result=>{
      
      // Si pas de données
      if(result.rowCount === 0){
        return null;
      }

      const data = result.rows.shift();
      return UserFriendModelMapper.getUserFriendModel(data.friend_email, data);
    });

    return findOneFriend;
  }

  /**
   * Suppression d'un ami
   * @param {DeleteFriendEntity} deleteFriend
   * @returns {Promise<UserFriendModel|null>}
   */
  async deleteFriendRelation(deleteFriend: DeleteFriendEntity): Promise<UserFriendModel|null> {

    const deleteRelation =  await client.query('DELETE FROM "friend_user" WHERE user_id=$1 AND friend_id=$2 returning *', [
      deleteFriend.userId, deleteFriend.friendId
   ]).then(result=>{

      // Si pas de résultat
      if(result.rowCount === 0){
        return null;
      }
      return UserFriendModelMapper.getUserFriendModel('fake Email', result.rows.shift())
   });

   return deleteRelation;
  }

  /**
   * Suppression
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "product_user" RESTART IDENTITY CASCADE');
  }

}