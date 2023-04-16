import { RelationModel } from "../models/RelationModel";

/**
 * Relation Model Mapper
 */
export class RelationModelMappper {
  /**
   * RelationModel Mapper
   * 
   * @param {any} data 
   * @returns {RelationModel}
   */
  static getRelationModel(data: any): RelationModel {   
    
    return new RelationModel({
      id: data.id.toString(),     
      senderId: data.sender_id,
      friendId: data.friend_id,
      friendEmail: data.friend_email,      
      isNew: data.is_new,
      isAcceppted: data.is_accepted,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });
  }
}