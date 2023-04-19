import { AcceptFriendRelationEntity } from "../../../domain/entities/relation/AcceptFriendRelationEntity";
import { AddFriendRelationEntity } from "../../../domain/entities/relation/AddFriendRelationEntity";
import { RelationRepositorySchema } from "../../../domain/ports/repositoriesSchemas/RelationRepositorySchema";
import { RelationModelMappper } from "../../dto/RelationModelMappper";
import { UserFriendModelMapper } from "../../dto/UserFriendModelMapper";
import { RelationModel } from "../../models/RelationModel";
import { UserFriendModel } from "../../models/userFriend/UserFriendModel";
import client from './connexion/databaseConnexion'

/**
 * Relation Repository
 */
export class PostgreSQLRelationRepository implements RelationRepositorySchema {

  /**
   * Ajout nouvelle relation
   * 
   * @param {AddFriendRelationEntity} relationData
   * @return {Promise<RelationEntity>}
   */
  async save(relationData: AddFriendRelationEntity): Promise<RelationModel|null> {
   
    const addRelation = await client.query(`
      INSERT INTO "relation" 
      ("created_at", "updated_at") 
      VALUES ($1, $2) 
      RETURNING *`, [
        relationData.createdAt, relationData.updatedAt
      ]).then(result=>{
      
        if(result.rowCount === 0) {
          return null;
        }

        return RelationModelMappper.getRelationModel(result.rows.shift());
    });

    return addRelation;
  }

  /**
   * Recherche relation par id
   * @param {string} relationId 
   * @return { Promise<Array<RelationModel>>}
   */
  async findById(relationId: string): Promise<RelationModel|null> {

    const findRelation = await client.query(`
    SELECT 
    "relation"."id",
    "relation"."created_at",
    "relation"."updated_at",
    "user"."email" AS friend_email
    FROM "relation"      
    JOIN "friend_user" ON "relation"."id" = "friend_user"."relation_id"
    JOIN "user" ON "friend_user"."friend_id" = "user"."id"
    WHERE "relation"."id"=$1 
    GROUP BY "relation"."id","user"."email"
      `, [
      relationId
    ]).then(result=>{
      if(result.rowCount === 0) {
        return null;
      }
      const data = result.rows.shift();
 
      return RelationModelMappper.getRelationModel(data);
    });


    // const findRelation = await client.query(`
    // SELECT 
    // "relation"."id",
    // "relation"."friend_id",
    // "relation"."is_accepted",
    // "relation"."is_new",
    // "relation"."created_at",
    // "relation"."updated_at",
    // "user"."email" AS friend_email
    // FROM "relation" 
    // JOIN "user" ON "relation"."friend_id" = "user"."id"     
    // WHERE "relation"."id"=$1`, [
    //   relationId
    // ]).then(result=>{

    //   if(result.rowCount === 0) {
    //     return null;
    //   }
    //   const data = result.rows.shift();
 
    //   return RelationModelMappper.getRelationModel(data);
    // });

    return findRelation
  }

  /**
   * Mise a jour d'une relation
   * 
   * @param {AcceptFriendRelationEntity} relationData 
   * @return {Promise<RelationEntity>}
   */
  async updateById(relationData: AcceptFriendRelationEntity): Promise<RelationModel|null> {
    
    const updateRepository = await client.query('UPDATE "relation" SET ("is_activated", "updated_at") = ($1, $2) WHERE id=$3 RETURNING *', [
      relationData.isActivated, relationData.updatedAt, relationData.relationId
    ]).then(result=>{
      if (result.rowCount === 0) {
        return null;
      }

      const data = result.rows.shift();

      return RelationModelMappper.getRelationModel(data);
    });

    return updateRepository;
  }

  /**
   * Liste des nouvelles realtions
   * @param {string} userId
   * @returns Promise<UserFriendModel[]>
   */
  async findNewRelationByUserId(userId: string): Promise<UserFriendModel[]> {
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
    WHERE user_id=$1 
    AND "relation".is_new=true 
    AND "relation".friend_id=$1`, [
      userId
    ]).then(results=>{
      
      return UserFriendModelMapper.getUserFriendsModel(results.rows);      
    });

    return friends;
  }

  /**
   * Suppression relation
   * @param {string} relationId 
   */
  async deleteById(relationId:  string): Promise<RelationModel|null> {
    
    const deleteRelation =  await client.query('DELETE FROM "relation" WHERE id=$1 returning *',[
      relationId
    ]).then(result=>{
      return RelationModelMappper.getRelationModel(result.rows.shift())
    })

    return deleteRelation;
  }

  /**
   * Suppr. relation
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "relation" RESTART IDENTITY CASCADE');
  }
  
}