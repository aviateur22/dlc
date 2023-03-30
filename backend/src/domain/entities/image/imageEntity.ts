/**
 * ProductImageEntity
 */
export class ImageEntity {
  readonly id!: string;
  readonly imageBase64!: string;
  readonly mimeType!: string;

  constructor(id: string, imageBase64: string, mimeType: string) {
    this.id = id;
    this.imageBase64 = imageBase64;
    this.mimeType = mimeType
  }
}