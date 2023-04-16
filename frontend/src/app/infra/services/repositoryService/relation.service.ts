import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';
import { AcceptdRelationSchema } from 'src/app/domain/ports/EntitiesSchemas/relation/AcceptRelationSchema';
import { FindNewRelationSchema } from 'src/app/domain/ports/EntitiesSchemas/relation/FindNewRelationSchema';
import { RefuseRelationSchema } from 'src/app/domain/ports/EntitiesSchemas/relation/RefuseRelationSchema';
import { RelationResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/relation/RelationResponseSchema';
import { RelationRepositorySchema } from 'src/app/domain/ports/repositoriesSchemas/RelationRepositorySchema';
import endPoint from 'src/app/domain/utils/endPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelationRepositoryService implements RelationRepositorySchema {

  constructor(private http: HttpClient) { }

  /**
   * Acceptation d'une relation ami
   * @param {AcceptdRelationSchema} data 
   * @returns {Observable<RelationResponseSchema>}
   */
  acceptRelation(data: AcceptdRelationSchema): Observable<RelationResponseSchema> {
    return this.http.post<RelationResponseSchema>(environment.baseUrl + endPoint.acceptFriendRelation.url, {
      relationId: data.relationId
    })
  }

  /**
   * Refus d'une relation ami
   * @param {RefuseRelationSchema} data 
   * @returns {Observable<RelationResponseSchema>}
   */
  refuseRelation(data: RefuseRelationSchema): Observable<RelationResponseSchema> {
    return this.http.delete<RelationResponseSchema>(environment.baseUrl + endPoint.refuseFriendRelation.url, {
      body: data
    })
  }

  /**
   * Recherche des nouvelle relation d'un utilisateur
   * @param {FindNewRelationSchema} data 
   * @returns {Observable<Array<FriendResponseSchema>>}
   */
  findNewRelation(data: FindNewRelationSchema): Observable<Array<FriendResponseSchema>> {
    return this.http.get<Array<FriendResponseSchema>>(environment.baseUrl + endPoint.findNewFriendRelation.url + data.userId)
  }
}
