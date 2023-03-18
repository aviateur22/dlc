import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import imageData from "../../utilities/imageData.json"

describe('AddProductUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  beforeEach(async()=>{
    await ProductGenerator.deleteProduct();
    await ImageGenerator.deleteImage();
    await ProductUserGenerator.deleteProductUser();
  });

  it('Should add a new product', async()=>{
    try {
      const product =  {
        userId: '1',
        openDate: new Date(),
        imageBase64: imageData.image.base64,
        mimeType: imageData.image.mimeType
      }
  
      const addProduct = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product
      });

      const products = await RepositoryServiceImpl.getRepository().productRepository.findAll();
      const images = await RepositoryServiceImpl.getRepository().imageRepository.findAll();
      const productsUsers = await RepositoryServiceImpl.getRepository().productUserRepository.findAll();
      
      // force le passage des propriété en string
      Object.keys(addProduct).forEach((property) => {       
        //@ts-ignore
        if(typeof addProduct[property] === "number") {
          //@ts-ignore
          addProduct[property] =  JSON.stringify(addProduct[property]);
        }
      })

      expect(addProduct).toEqual(expect.objectContaining({
        id: '1',
        openDate: product.openDate,
        imageId: '1',
        createdAt: addProduct.createdAt,
        updatedAt: addProduct.updatedAt,
        userId: '1'
      }));

      expect(products.length).toBe(1);
      expect(images.length).toBe(1);
      expect(productsUsers.length).toBe(1);

    } catch (error) {
      expect(error).toBeFalsy();
    }    
  });
});