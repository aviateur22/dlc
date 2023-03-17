/**
 * ImageModel
 */
export class ImageModel {
  readonly id!: string;  
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(image: Partial<ImageModel>) {
    let key: keyof typeof image;
    for(key in image) { 
      // @ts-ignore
      this[key] = image[key]
    }
  }
}