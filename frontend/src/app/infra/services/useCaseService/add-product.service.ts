import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddProductResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/AddProductResponseSchema';
import { AddProductSchema } from 'src/app/domain/ports/EntitiesSchemas/AddProductSchema';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  // Schema response
  private addProductProductSchema!: AddProductResponseSchema;

  // Rxjs
  private addProduct = new BehaviorSubject(this.addProductProductSchema);
  public addProductResponseObservable = this.addProduct.asObservable();
 
 /**
 * Mise a jour 
 * @param {AddProductSchema} addProduct 
 */
 updateAddProduct(addProduct: AddProductResponseSchema): void {
   this.addProduct.next(addProduct);     
 }
}
