import { AcceptFriendRelationEntity } from "../../../domain/entities/relation/AcceptFriendRelationEntity";
import { AddFriendRelationEntity } from "../../../domain/entities/relation/AddFriendRelationEntity";
import { RelationRepositorySchema } from "../../../domain/ports/repositoriesSchemas/RelationRepositorySchema";
import { RelationModelMappper } from "../../dto/RelationModelMappper";
import { RelationModel } from "../../models/RelationModel";
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
    WITH add_relation AS (
      INSERT INTO "relation" ("friend_id", "is_accepted", "is_new", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5) RETURNING *
    )
    SELECT 
    "add_relation"."id",
    "add_relation"."friend_id",
    "add_relation"."is_accepted",
    "add_relation"."is_new",
    "add_relation"."created_at",
    "add_relation"."updated_at",
    "user"."email" AS friend_email
    from add_relation
    JOIN "user" ON "add_relation"."friend_id" = "user"."id"
    `, [
      relationData.friendId, relationData.isAccepted, relationData.isNew, relationData.createdAt, relationData.updtedAt
    ]).then(result=>{
      
      if(result.rowCount === 0) {
        return null;
      }      

      return RelationModelMappper.getRelationModel(result.rows.shift());
    })

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
      "relation"."friend_id",
      "relation"."is_accepted",
      "relation"."is_new",
      "relation"."created_at",
      "relation"."updated_at",
      "user"."email" AS friend_email
      FROM "relation" 
      JOIN "user" ON "relation"."friend_id" = "user"."id"
      JOIN "friend_user" ON "relation"."id" = "friend_user"."relation_id"
      WHERE "relation"."id"=$1 
      GROUP BY "relation"."id","user"."email"
      `, [
      relationId
    ]).then(result=>{
      console.log(result.rows);
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
    
    const updateRepository = await client.query('UPDATE "relation" SET ("is_accepted", "is_new", "updated_at") = ($1, $2, $3) WHERE id=$4 RETURNING *', [
      relationData.isAccepted, relationData.isNew, relationData.updtedAt, relationData.relationId
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