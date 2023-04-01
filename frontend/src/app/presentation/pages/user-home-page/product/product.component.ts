import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductSchema } from 'src/app/domain/ports/EntitiesSchemas/ProductSchema';
import { ImageRepositoryService } from 'src/app/infra/services/repositoryService/image-repository.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input()
  product!: ProductSchema;

  @Output()
  deleteProductEmit: EventEmitter<ProductSchema> = new EventEmitter<ProductSchema>();

  // Image d produit
  productImage: any;

  constructor(
    private imageService: ImageRepositoryService,
    
  ) { }

  ngOnInit() {
    this.findProductImage()
  }

  /**
   * Recherche image du produit
   */
  private findProductImage() {
    this.imageService.findProductImage({imageId: this.product.imageId}).subscribe({
      next: findProductImageResponse=>{
        this.productImage = `data:${findProductImageResponse.imageMimeType};base64,${findProductImageResponse.imageBase64}`;
      }
    });
  }

  /**
   * Suppression produit
   */
  deleteProduct() {   
    this.deleteProductEmit.emit(this.product);
  }
}
