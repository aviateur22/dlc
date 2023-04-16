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
      isActivated: data.is_activated,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });
  }
}