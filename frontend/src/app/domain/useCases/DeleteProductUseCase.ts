import { ProductRepositoryService } from "src/app/infra/services/repositoryService/product-repository.service";
import { Injectable } from "@angular/core";
import { SessionInformation } from "../helpers/SessionInformation";
import { DeleteProductUseCaseSchema } from "../ports/EntitiesSchemas/deleteProduct/DeleteProductUseCaseSchema";
import { DeleteProductService } from "src/app/infra/services/useCaseService/delete-product.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteProductUseCase {

  constructor(
    private productService: ProductRepositoryService,
    private sessionInformation: SessionInformation,
    private deleteProductService: DeleteProductService
  ){}

  /**
   * Suppression Produit
   * @param {DeleteProductUseCaseSchema} data
   */
  execute(data: DeleteProductUseCaseSchema) {
    const userId = this.sessionInformation.getUserInformation().userId;

    this.productService.deleteProduct({userId, productId: data.product.id}).subscribe({
     next: deleteProductResponse =>{
      
      this.deleteProductService.updateDeleteProduct(deleteProductResponse);
     
      // Suppression
      data.products.splice(data.products.indexOf(data.product), 1);
     }
    })
  }
}