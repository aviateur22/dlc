import { AcceptFriendRelationEntity } from "../../../domain/entities/relation/AcceptFriendRelationEntity";
import { AddFriendRelationEntity } from "../../../domain/entities/relation/AddFriendRelationEntity";
import { RelationRepositorySchema } from "../../../domain/ports/repositoriesSchemas/RelationRepositorySchema";
import { RelationModel } from "../../models/RelationModel";
import { RepositoryServiceImpl } from "../../services/repository/RepositoryServiceImpl";


/**
 * Relation Repository
 */
export class InMemoryRelationRepository implements RelationRepositorySchema {

  private relaltions: Array<RelationModel> = [];

  /**
   * Ajout nouvelle relation
   * 
   * @param {AddFriendRelationEntity} relationData
   * @return {Promise<RelationEntity>}
   */
  async save(relationData: AddFriendRelationEntity): Promise<RelationModel|null> {

    //id
    const id = (Math.max(...this.relaltions.map(x=>Number(x.id))) + 1).toString();

    // Email
    const friendEmail = await RepositoryServiceImpl.getRepository().userRepository.findById(relationData.friendId).then(result=>result!.email);

    // Relation
    const relation: RelationModel = {
      id,
      friendId: relationData.friendId,
      isAcceppted: relationData.isAccepted,
      isNew: relationData.isNew,
      friendEmail,
      createdAt: relationData.createdAt,
      updatedAt: relationData.updtedAt
    }

    this.relaltions.push(relation);

    return relation;
  }

  /**
   * Recherche relation par id
   * @param {string} realtionId 
   * @return { Promise<Array<RelationModel>>}
   */
  async findById(realtionId: string): Promise<RelationModel|null>{
    return this.relaltions.filter(x=>x.id === realtionId)[0];
  }

  /**
   * Mise a jour d'une relation
   * 
   * @param {AcceptFriendRelationEntity} relationData 
   * @return {Promise<RelationEntity>}
   */
  async updateById(relationData: AcceptFriendRelationEntity): Promise<RelationModel|null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Suppression relation
   * @param {string} relationId 
   */
  async deleteById(relationId:  string): Promise<RelationModel|null> {
    const findRelation = this.relaltions.find(x=>x.id === relationId);

    if(!findRelation) {
      return null;
    }

    const index = this.relaltions.findIndex(x=>x.id === relationId);
    this.relaltions.splice(index, 1);

    return findRelation;
  }

  /**
   * Suppr. relation
   */
  async deleteAll(): Promise<void> {
    this.relaltions = []
  }

 
}