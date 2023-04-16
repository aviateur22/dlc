import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSchema } from 'src/app/domain/ports/EntitiesSchemas/ProductSchema';
import { DeleteProductUseCase } from 'src/app/domain/useCases/DeleteProductUseCase';
import url from 'src/app/domain/utils/url';
import { DeleteProductService } from 'src/app/infra/services/useCaseService/delete-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input()
  products: Array<ProductSchema> = [];

  // Visibilité modal supp. produit
  isDeleteModalVisible: boolean = false;

  // Produit a supprimer
  productToDelete: ProductSchema | undefined;

  constructor(
    private deleteProductUseCase: DeleteProductUseCase, 
    private router: Router,
    private deleteProductService: DeleteProductService
  ){}

  /**
   * Affichage Modal
   */
  displayDeleteModal(product: ProductSchema){
    this.isDeleteModalVisible = true;
    this.productToDelete = product;   
  }
  /**
   * Suppression produit
   * @param {ProductSchema} product 
   */
  deleteProduct() {
    if(typeof this.productToDelete === 'undefined') {
      throw new Error('');
    }

    this.deleteProductService.deleteProductResponseObservable.subscribe(deleteProduct=>{
      if(deleteProduct) {
        this.cancelDeleteProduct();
      }
    })

    this.deleteProductUseCase.execute({ product: this.productToDelete, products: this.products });    
  }

  /**
   * Annulation supression
   */
  cancelDeleteProduct() {
    this.isDeleteModalVisible = false;
  }

  /**
   * Redirection page ajout produit
   */
  redirectToAddProductPage() {
    this.router.navigate([url.addProduct])
  }
}
