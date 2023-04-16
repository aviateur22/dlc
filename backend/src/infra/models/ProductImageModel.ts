/**
 * ProductImage
 */
export class ProductImageModel {
  readonly id!: string;
  readonly imageBase64!: string;
  readonly mimeType!: string;
 
  constructor(id: string, ProductImage: string, mimeType: string) {
    this.id = id; 
    this.imageBase64 = ProductImage;
    this.mimeType = mimeType;
  }
}