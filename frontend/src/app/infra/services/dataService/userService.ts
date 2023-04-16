import { Injectable } from "@angular/core";
import { SessionInformation } from "src/app/domain/helpers/SessionInformation";
import { ProductSchema } from "src/app/domain/ports/EntitiesSchemas/ProductSchema";
import { UserAuthInformation } from "src/app/domain/ports/EntitiesSchemas/UserAuthInformation";
import { UserProductsUseCase } from "src/app/domain/useCases/UserProductsUseCase";
import { UserProductsService } from "../useCaseService/user-products.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Liste des produits
  products: Array<ProductSchema> = [];

  // Produit cliqué
  product: ProductSchema | undefined;

  // Données user
  userInformation: UserAuthInformation;

  constructor(
    private userProductsUseCase: UserProductsUseCase,
    private sessionInformation: SessionInformation,
    private userProductService: UserProductsService    
  ) {
    this.userInformation = sessionInformation.getUserInformation();
    this.getUserProducts();
  }

  getProducts() {
    return this.products;
  }

  getUserProducts() {
    this.userProductsUseCase.execute(this.userInformation);

    this.userProductService.userProductsResponseObservable.subscribe(userProductsResponse=>{

      if(userProductsResponse) {          
        console.log(this.products)      
        this.products = userProductsResponse.products.products;
      }
    });
  }
}