import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { ImageNotFindException } from "../../../exceptions/ImageNotFindException";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('ImageUseCase', ()=>{
    // Selection Server Express
    const testUtilities = new TestUtilities();

    // Selection des services pour les tests
    testUtilities.selectService();
  
    beforeEach(async()=>{
      await UserGenerator.resteUser();
      await ProductGenerator.deleteProduct();
      await ImageGenerator.deleteImage();
      await UserFriendGenerator.deleteAllUserFriendRelations();      
      await ProductUserGenerator.deleteProductUser();
      await ProductGenerator.createProduct();
    });
  
  it('Should get the product image', async()=>{
    const imageId = '1';

    const productImage = await UseCaseServiceImpl.getUseCases().imageUseCase.findProductImageUseCase.execute(imageId);
    const image = await RepositoryServiceImpl.getRepository().imageRepository.findProductImageById('1');
    expect(productImage).toBeTruthy()
    expect(productImage?.toString()).toBe(image?.toString());
  });

  it('Should throw ImageNotFindException because it does not exist', async()=>{
    try {
      const imageId = '2';

      const productImage = await UseCaseServiceImpl.getUseCases().imageUseCase.findProductImageUseCase.execute(imageId);
      
      expect(productImage).toBeFalsy()
     
    } catch (error) {
      expect(error).toBeInstanceOf(ImageNotFindException);
    }  
  });

});