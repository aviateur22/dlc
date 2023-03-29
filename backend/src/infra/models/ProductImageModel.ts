/**
 * ProductImage
 */
export class ProductImageModel {
  readonly imageBase64!: string;
 
  constructor(ProductImage: string) {
   this.imageBase64 = ProductImage
  }
}