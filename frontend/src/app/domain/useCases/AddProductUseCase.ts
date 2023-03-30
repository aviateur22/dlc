import { Injectable } from "@angular/core";
import { ProductRepositoryService } from "src/app/infra/services/repositoryService/product-repository.service";
import { SessionInformation } from "../helpers/SessionInformation";
import { AddProductSchema } from "../ports/EntitiesSchemas/AddProductSchema";

@Injectable({
  providedIn: 'root'
})
export class AddProductUseCase {

  constructor(
    private sessionInformation :SessionInformation, 
    private productService: ProductRepositoryService
  ) {}

  /**
   * Sauvegardr produit
   * @param productData 
   */
  execute(productData: { openDate: Date, image: string }) {

    const userInformation = this.sessionInformation.getUserInformation();

    const addProductData: AddProductSchema = {
      userId: userInformation.userId,
      openDate: productData.openDate,
      image: productData.image
    }

    // Sauvegarde
    this.productService.addProduct(addProductData).subscribe({
      next: Response=>{

      }
    })

    console.log(userInformation)
  }
}