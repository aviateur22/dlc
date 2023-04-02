import { RelationModel } from "../../../infra/models/RelationModel";
import { UserFriendModel } from "../../../infra/models/userFriend/UserFriendModel";
import { AcceptFriendRelationEntity } from "../../entities/relation/AcceptFriendRelationEntity";
import { AddFriendRelationEntity } from "../../entities/relation/AddFriendRelationEntity";

/**
 * Schema base de données Repository
 */
export interface RelationRepositorySchema {

  /**
   * Ajout nouvelle relation
   * 
   * @param {AddFriendRelationEntity} relationData
   * @return {Promise<RelationEntity>}
   */
  save(relationData: AddFriendRelationEntity): Promise<RelationModel|null>;

  /**
   * Recherche relation par id
   * @param {string} realtionId 
   * @return { Promise<Array<RelationModel>>}
   */
  findById(realtionId: string): Promise<RelationModel|null>

  
  /**
   * Liste des nouvelles realtions
   * @param {string} userId
   * @returns Promise<UserFriendModel[]>
   */
  findNewRelationByUserId(userId: string): Promise<UserFriendModel[]>;

  /**
   * Mise a jour d'une relation
   * 
   * @param {AcceptFriendRelationEntity} relationData 
   * @return {Promise<RelationEntity>}
   */
  updateById(relationData: AcceptFriendRelationEntity): Promise<RelationModel|null>;

  /**
   * Suppression relation
   * @param {string} relationId 
   */
  deleteById(relationId:  string): Promise<RelationModel|null>;

  /**
   * Suppr. relation
   */
  deleteAll(): Promise<void>
}