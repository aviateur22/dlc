import { Component, Input } from '@angular/core';
import { ProductSchema } from 'src/app/domain/ports/EntitiesSchemas/ProductSchema';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import imageT from './test'
import { ImageRepositoryService } from 'src/app/infra/services/repositoryService/image-repository.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input()
  product!: ProductSchema;

  image: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer, private imageService: ImageRepositoryService) { }

  ngOnInit() {
    //this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.product.imageBase64}`)

  }

  ngAfterViewInit(){
    //this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.product.imageBase64}`)
   // console.log(this.image)
    this.imageService.findProductImage({
      imageId: '1'
    }).subscribe({
      next:t=>{
        console.log(t.imageBase64);
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${t.imageBase64}`)
      }
    })
  }
}
