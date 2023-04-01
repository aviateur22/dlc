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
   * @returns {Promise<Array<UserFriendModel>>}
   */
  async addFriend(addFriend: AddFriendEntity): Promise<Array<UserFriendModel>> {
    
    // Ajout user->friend
    const friend = await client.query(`
    WITH add_new_relation AS (
      INSERT INTO "friend_user" 
      ("user_id", "friend_id", "friend_name", "relation_id", "created_at", "updated_at") 
      VALUES 
      ($1, $2, $3, $4, $5 ,$6),
      ($2, $1, $3, $4 ,$5 ,$6)
      returning *
    )    
    SELECT * FROM add_new_relation
    JOIN "user" ON "add_new_relation".user_id = "user".id
    `, [
      addFriend.userId, addFriend.friendId, addFriend.friendName,addFriend.relationId, addFriend.createdAt, addFriend.updatedAt
    ]).then(result=>{

      // Pas de données
      if(result.rowCount === 0) {
        return null;
      }
      
      // Data
      const data = result.rows;     
      return UserFriendModelMapper.getUserFriendsModel(data);
    });

    return friend!;
  }

  /**
   * Recherche de tous les amis d'une personne ayant la relalion valide
   * @param {string} userId 
   * @returns {Promise<Array<UserFriendModel>>}
   */
  async findAllFriendByUserId(userId: string): Promise<UserFriendModel[]> {   
    const friends = await client.query(`
    SELECT 
    "friend_user".id AS id,
    "friend_user".user_id AS user_id,
    "friend_user".friend_id AS friend_id,
    "user".email AS email,
    "friend_user".friend_name AS friend_name,
    "friend_user".created_at AS created_at, 
    "friend_user".updated_at AS updated_at,
    "relation".id AS relation_id,
    "relation".is_accepted AS is_relation_accepted
    FROM "friend_user"
    JOIN "user" ON "friend_user".friend_id = "user".id
    JOIN "relation" ON "friend_user"."relation_id"= "relation"."id"
    WHERE user_id=$1 AND "relation".is_accepted=true`, [
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
    "user".email AS email,
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
      return UserFriendModelMapper.getUserFriendModel(data);
    });

    return findOneFriend;
  }

  /**
   * Recherche des amis suivants une relation
   * @param {string} relationId 
   * @returns {Promise<Array<UserFriendModel>>}
   */
  async findByRelationId(relationId: string): Promise<UserFriendModel[]> {
    const friendsRelations = await client.query('SELECT * FROM "friend_user" WHERE "relation_id"=$1', [
      relationId
    ]).then(result=>{
      return UserFriendModelMapper.getUserFriendsModel(result.rows);
    });

    return friendsRelations;
  }  

  /**
   * Suppression ami user->friend et friend->user
   * @param {DeleteFriendEntity} deleteFriend
   * @returns {Promise<UserFriendModel|null>}
   */
  async deleteFriendRelation(deleteFriend: DeleteFriendEntity): Promise<Array<UserFriendModel>|null> {

    const deleteRelation =  await client.query(`
    WITH delete_friend_user AS (
      DELETE FROM "friend_user" WHERE (user_id=$1 AND friend_id=$2) OR (user_id=$2 AND friend_id=$1) returning *
    )
    SELECT * FROM "delete_friend_user" 
    JOIN "user" ON "delete_friend_user".user_id = "user".id
    `, [
      deleteFriend.userId, deleteFriend.friendId
   ]).then(result=>{

      // Si pas de résultat
      if(result.rowCount === 0){
        return null;
      }

      return UserFriendModelMapper.getUserFriendsModel(result.rows)
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