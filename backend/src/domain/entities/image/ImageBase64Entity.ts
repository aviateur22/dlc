/**
 * ImageBase65
 */
export class ImageBase64Entity {
  readonly id!: string;
  readonly imageBase64!: string;
  readonly mimeType!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(image: Partial<ImageBase64Entity>) {
    let key: keyof typeof image;
    for(key in image) { 
      // @ts-ignore
      this[key] = image[key]
    }
  }
}