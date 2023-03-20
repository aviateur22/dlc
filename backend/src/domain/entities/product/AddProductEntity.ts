/**
 * AddProductEntity
 */
export class AddProductEntity {
  readonly image!: any;
  readonly userId!: string;
  readonly openDate!: Date;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(addProduct: Partial<AddProductEntity>) {  
    const createdAt = new Date();

    let key: keyof typeof addProduct;
    for(key in addProduct) { 
      // @ts-ignore
      this[key] = addProduct[key]!
    }

    this.createdAt = createdAt;
    this.updatedAt = createdAt;    
  }
}