import { Component } from '@angular/core';
import { ProductSchema } from 'src/app/domain/ports/EntitiesSchemas/ProductSchema';
import { UserAuthInformation } from 'src/app/domain/ports/EntitiesSchemas/UserAuthInformation';
import { UserProductsResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/UserProductsResponseSchema';
import { UserProductsUseCase } from 'src/app/domain/useCases/UserProductsUseCase';
import { SessionInformation } from 'src/app/domain/utils/SessionInformation';
import { UserProductsService } from 'src/app/infra/services/useCaseService/user-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {  

  products: Array<ProductSchema> = [];

  // Info utilisateur
  userInformation: UserAuthInformation = this.sessionInformation.getUserInformation();

  constructor(
    private userProductsUseCase: UserProductsUseCase, 
    private sessionInformation: SessionInformation, 
    private userProductService: UserProductsService
  ) {}

  ngOnInit() {    
    this.getUserProducts(); 
  }

  /**
   * Récupération produits clients
   */
  private getUserProducts() {
    this.userProductsUseCase.execute(this.userInformation);

    this.userProductService.userProductsResponseObservable.subscribe(userProductsResponse=>{

      if(userProductsResponse) {                
        this.products = userProductsResponse.products.products;
      }
    });
  }
}
