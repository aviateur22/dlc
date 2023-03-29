import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductImageResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/ProductImageResponseSchema';
import { ProductImageSchema } from 'src/app/domain/ports/EntitiesSchemas/ProductImageSchema';
import endPoint from 'src/app/domain/utils/endPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageRepositoryService {

  constructor(private http: HttpClient) { }

   /**
   * Récupération produits utilisateur
   * @param {UserProductsSchema} data
   * @returns {Observable<UserProductsResponseSchema>}
   */
   findProductImage(imageId: ProductImageSchema): Observable<ProductImageResponseSchema> {    
    return this.http.get<ProductImageResponseSchema>(environment.baseUrl + endPoint.productImage.url +"/"+ imageId.imageId);
  }
}
