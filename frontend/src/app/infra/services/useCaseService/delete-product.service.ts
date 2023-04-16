import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeleteProductResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/deleteProduct/DeleteProductResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductService {

 // Schema response
 private deleteProductSchema!: DeleteProductResponseSchema;

 // Rxjs
 private deleteProduct = new BehaviorSubject(this.deleteProductSchema);
 public deleteProductResponseObservable = this.deleteProduct.asObservable();

 /**
 * Mise a jour 
 * @param {DeleteProductResponseSchema} deleteProduct 
 */
 updateDeleteProduct(deleteProduct: DeleteProductResponseSchema): void {
   this.deleteProduct.next(deleteProduct);     
 }
}
