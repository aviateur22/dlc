import { Injectable } from "@angular/core";
import { ProductRepositoryService } from "src/app/infra/services/repositoryService/product-repository.service";
import { SessionInformation } from "../helpers/SessionInformation";
import { AddProductSchema } from "../ports/EntitiesSchemas/AddProductSchema";
import { AddProductService } from "src/app/infra/services/useCaseService/add-product.service";

@Injectable({
  providedIn: 'root'
})
export class AddProductUseCase {

  constructor(
    private sessionInformation :SessionInformation, 
    private productService: ProductRepositoryService,
    private addProductService: AddProductService
  ) {}

  /**
   * Sauvegardr produit
   * @param {File} selectedProduct - Image du produit
   */
  execute(selectedProduct: File) {

    const userInformation = this.sessionInformation.getUserInformation();

    const productData = new FormData();
    productData.append('image', selectedProduct);
    productData.append("userId", userInformation.userId);
    productData.append("openDate",new Date().toDateString());
    productData.append("token", localStorage.getItem('token')!);

    // Sauvegarde
    this.productService.addProduct(productData).subscribe({
      next: addProductResponse=>{
        this.addProductService.updateAddProduct(addProductResponse);      
      }
    });
  }
}