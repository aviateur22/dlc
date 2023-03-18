import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl"
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";
import imageData from '../../utilities/imageData.json';

describe('UserHomePageUseCase', ()=>{
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
    const addProduct = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      imageBase64: imageData.image.base64,
      mimeType: imageData.image.mimeType,
      openDate: new Date(),
      userId: '2'
    });

    const userProducts = await UseCaseServiceImpl.getUseCases().userUsecase.userHomePageUseCase.execute(userId);

    expect(userProducts).toBeTruthy();

  })
})