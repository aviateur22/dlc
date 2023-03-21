import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl"
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";
import imageData from '../../utilities/imageData.json';

describe('ProductsUserUseCase', ()=>{
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
  
  it('Should get all products of the user', async ()=>{
    const { userId } = {
      userId: '1'
    }

    // Ajout d'un product
    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      image: '',
      openDate: new Date(),
      userId: '2'
    });

    // Récupérarions
    const userProductsPerson1 = await UseCaseServiceImpl.getUseCases().userUsecase.findProductsOfUserUseCase.execute(userId);
    const userProductsPerson2 = await UseCaseServiceImpl.getUseCases().userUsecase.findProductsOfUserUseCase.execute("2");


    expect(userProductsPerson1).toEqual(expect.objectContaining({
      userId: '1',
      userEmail:'aviateur22@hotmail.fr',
      products: [
        {
          id: '1',
          mimeType: imageData.image.mimeType,
          imageBase64: imageData.image.base64,
          openDate : userProductsPerson1.products[0].openDate,
          createdAt: userProductsPerson1.products[0].createdAt,
          updatedAt: userProductsPerson1.products[0].updatedAt
        }
      ]
    }));

    expect(userProductsPerson2).toEqual(expect.objectContaining({
      userId: '2',
      userEmail:'helixia22@hotmail.fr',
      products: [
        {
          id: '2',
          mimeType: imageData.image.mimeType,
          imageBase64: imageData.image.base64,
          openDate : userProductsPerson2.products[0].openDate,
          createdAt: userProductsPerson2.products[0].createdAt,
          updatedAt: userProductsPerson2.products[0].updatedAt
        }
      ]
    }));
    expect(userProductsPerson2).toBeTruthy();

  })
})