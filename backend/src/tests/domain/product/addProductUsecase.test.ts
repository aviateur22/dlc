import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { TestUtilities } from "../../utilities/TestUtilities";
import imageData from "./imageData.json"

describe('AddProductUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  it('Should add a new product', async()=>{
    try {
      const product =  {
        userId: '1',
        openDate: new Date(),
        imageBase64: imageData.image.base64,
        mimeType: imageData.image.mimType
      }
  
      const addProduct = UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product
      });

      const products = await RepositoryServiceImpl.getRepository().productRepository.findAll();
      
  
      expect(addProduct).toBeTruthy();
      expect(products.length).toBe(1);

    } catch (error) {
      expect(error).toBeFalsy();
    }
    
  });
});