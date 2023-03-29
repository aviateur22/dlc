import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProductsResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/UserProductsResponseSchema';
import { UserProductsSchema } from 'src/app/domain/ports/EntitiesSchemas/UserProductsSchema';
import { environment } from 'src/environments/environment';
import endPoint from '../../../domain/utils/endPoint';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService {

  constructor(private http: HttpClient) {}

  /**
   * Récupération produits utilisateur
   * @param {UserProductsSchema} data
   * @returns {Observable<UserProductsResponseSchema>}
   */
  userProducts(data: UserProductsSchema): Observable<UserProductsResponseSchema> {    
    return this.http.get<UserProductsResponseSchema>(environment.baseUrl + endPoint.productsUser.url +"/"+ data.userId);
  }
}
