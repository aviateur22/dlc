import messages from "../../../domain/messages/messages";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { ProductNotFindException } from "../../../exceptions/ProductNotFindException";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('FindProductUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  beforeEach(async()=>{
    await UserGenerator.resteUser();
    await ProductGenerator.deleteProduct();
    await ImageGenerator.deleteImage();
    await ProductUserGenerator.deleteProductUser();
    await ProductGenerator.createProduct();
  });
  
  it('Should find all products of a user', async ()=>{
    const { productId, userId } = {
      productId: '1',
      userId: '1'
    }

    const product = await UseCaseServiceImpl.getUseCases().productUsecase.findProductUseCase.execute({ userId, productId});

    for(let property in product) {
      // @ts-ignore
      if(typeof product[property] === 'number'){
        //@ts-ignore
        product[property] = JSON.stringify(product[property])
      }      
    }
    
    expect(product).toEqual(expect.objectContaining({
      id: '1',
      openDate: ProductGenerator.getAddProductEntity().openDate,
      imageId: '1' ,
      userId: '1',
      createdAt:  product.createdAt,
      updatedAt: product.updatedAt
    }))
  });

  it('Should throw ProductNotFindException because product does not exist', async ()=>{
    try {     
      const { productId, userId } = {
        productId: '10',
        userId: '1'
      }

      const product = await UseCaseServiceImpl.getUseCases().productUsecase.findProductUseCase.execute({ userId, productId});
      expect(product).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(ProductNotFindException);
      expect(error.message).toBe(messages.message.productNotFind);
    }
  });

  it('Should throw ProductNotFindException because product does not belong to user', async ()=>{
    try {     
      const { productId, userId } = {
        productId: '1',
        userId: '2'
      }

      const product = await UseCaseServiceImpl.getUseCases().productUsecase.findProductUseCase.execute({ userId, productId});
      expect(product).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(ProductNotFindException);
      expect(error.message).toBe(messages.message.productNotToUser);
    }
  })
});

