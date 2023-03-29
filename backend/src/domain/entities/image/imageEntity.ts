/**
 * ProductImageEntity
 */
export class ImageEntity {
  imageBase64!: string;

  constructor(imageBase64: string) {
    this.imageBase64 = imageBase64;
  }
}