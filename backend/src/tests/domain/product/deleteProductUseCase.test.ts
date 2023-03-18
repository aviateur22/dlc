import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";

describe('DeleteProductUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  beforeEach(async()=>{
    await ProductGenerator.deleteProduct();
    await ImageGenerator.deleteImage();
    await ProductUserGenerator.deleteProductUser();
    await ProductGenerator.createProduct();
  });
  
  it('Should delete the product', async()=>{

    try {
      const product = {
        productId:'1',
        userId: '1'
      }
  
      const deleteProduct = await UseCaseServiceImpl.getUseCases().productUsecase.deleteProductUseCase.execute({
        ...product
      });  

      const products = await RepositoryServiceImpl.getRepository().productRepository.findAll();
      const images = await RepositoryServiceImpl.getRepository().imageRepository.findAll();
      const productsUsers = await RepositoryServiceImpl.getRepository().productUserRepository.findAll();      
      
      expect(deleteProduct).toBeTruthy();
      expect(products.length).toBe(0);
      expect(images.length).toBe(0);
      expect(productsUsers.length).toBe(0);

    } catch (error) {
      console.log(error)
      expect(error).toBeFalsy();
    }

    
  });
})