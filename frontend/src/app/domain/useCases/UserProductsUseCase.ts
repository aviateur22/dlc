import { Injectable } from "@angular/core";
import { FlashMessageService } from "src/app/infra/services/flashMessage/flash-message.service";
import { ProductRepositoryService } from "src/app/infra/services/repositoryService/product-repository.service";
import { UserProductsService } from "src/app/infra/services/useCaseService/user-products.service";
import { UserProductsSchema } from "../ports/EntitiesSchemas/UserProductsSchema";

/**
 * Récupération de tous les produits
 */
@Injectable({
  providedIn: 'root'
})
export class UserProductsUseCase {

  constructor(
    private userProductsService: UserProductsService, 
    private productService: ProductRepositoryService,
    private flashService: FlashMessageService
  ) {}

  /**
   * 
   * @param userProductsdata 
   */
  execute(userProductsdata: UserProductsSchema) {
    this.productService.userProducts(userProductsdata).subscribe({
      next: userProductsResponse=> {        
        this.userProductsService.updateUserProducts(userProductsResponse);
      },
      error: error=> {
        this.flashService.updateFlashMessage(error.error.errorMessage);
      }
    });    
  }
}