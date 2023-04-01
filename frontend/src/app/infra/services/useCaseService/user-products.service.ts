import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProductsResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/UserProductsResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class UserProductsService {

  // Schema response
  private userProductsResponseschema!: UserProductsResponseSchema;

  // Rxjs
  private userProductsResponse = new BehaviorSubject(this.userProductsResponseschema);
  public userProductsResponseObservable = this.userProductsResponse.asObservable();

  /**
  * Mise a jour des produits utilisateur
  * @param {UserProductsResponseSchema} userProducts 
  */
  updateUserProducts(userProducts: UserProductsResponseSchema): void {
    this.userProductsResponse.next(userProducts);     
  }
}
