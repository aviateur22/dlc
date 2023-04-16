import { Observable } from "rxjs"
import { AcceptdRelationSchema } from "../EntitiesSchemas/relation/AcceptRelationSchema"
import { RefuseRelationSchema } from "../EntitiesSchemas/relation/RefuseRelationSchema"
import { RelationResponseSchema } from "../EntitiesSchemas/relation/RelationResponseSchema"

export interface RelationRepositorySchema {
  /**
   * Acceptation d'une relation ami
   * @param {AcceptdRelationSchema} data 
   * @returns {Observable<RelationResponseSchema>}
   */
  acceptRelation(data: AcceptdRelationSchema): Observable<RelationResponseSchema>

  /**
   * Refus d'une relation ami
   * @param data 
   * @returns {Observable<RelationResponseSchema> }
   */
  refuseRelation(data: RefuseRelationSchema): Observable<RelationResponseSchema> 
}