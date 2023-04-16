import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProductResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/AddProductResponseSchema';
import { UserProductsResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/UserProductsResponseSchema';
import { UserProductsSchema } from 'src/app/domain/ports/EntitiesSchemas/UserProductsSchema';
import { environment } from 'src/environments/environment';
import endPoint from '../../../domain/utils/endPoint';
import { DeleteProductSchema } from 'src/app/domain/ports/EntitiesSchemas/deleteProduct/DeleteProductSchema';
import { DeleteProductResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/deleteProduct/DeleteProductResponseSchema';

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
  addProduct(data: FormData): Observable<AddProductResponseSchema> {
    // Ajout headers
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'multipart/form-data');
    
    return this.http.post<AddProductResponseSchema>(environment.baseUrl + endPoint.addProduct.url, data)
  }

  /**
   * Suppr. produit
   * @param {DeleteProductSchema} data 
   * @returns {Observable<DeleteProductResponseSchema>}
   */
  deleteProduct(data: DeleteProductSchema): Observable<DeleteProductResponseSchema> {
    return this.http.delete<DeleteProductResponseSchema>(environment.baseUrl + endPoint.deleteProduct.url + data.productId, {
      body: {
        userId: data.userId
      }
    });
  }
}
