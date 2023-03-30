import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProductResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/AddProductResponseSchema';
import { AddProductSchema } from 'src/app/domain/ports/EntitiesSchemas/AddProductSchema';
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

  /**
   * Ajout produit
   * @param {AddProductSchema} data 
   * @returns {Observable<AddProductResponseSchema>}
   */
  addProduct(data: AddProductSchema): Observable<AddProductResponseSchema> {
    return this.http.post<AddProductResponseSchema>(environment.baseUrl + endPoint.addProduct.url,{
      userId: data.userId,
      openDate: data.openDate,
      image: data.image,
      token: localStorage.getItem('token')
    })
  }
}
