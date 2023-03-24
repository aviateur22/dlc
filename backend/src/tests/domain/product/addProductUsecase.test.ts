import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import imageData from "../../utilities/imageData.json"
import { UserGenerator } from "../../utilities/UserGenerator";
import { AddProductException } from "../../../exceptions/AddProductException";
import { ImageSizeException } from "../../../exceptions/ImageSizeException";
import messages from "../../../domain/messages/messages";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";

describe('AddProductUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  beforeEach(async()=>{
    await UserGenerator.resteUser();
    await ProductGenerator.deleteProduct();
    await ImageGenerator.deleteImage();
    await UserFriendGenerator.deleteUserProducts();
    await ProductUserGenerator.deleteProductUser();
  });

  it('Should add a new product', async()=>{
    try {
      const product =  {
        userId: '1',
        openDate: new Date(),
        image: {
          size: 50000,
          data: imageData.image.base64,
          mimetype: 'image/jpeg'
        }        
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

  it('Should add a new product to all of the freinds', async()=>{
    try {

      // Ajouts de 2 produits
      const product1 =  {
        userId: '1',
        openDate: new Date(),
        image: {
          size: 50000,
          data: imageData.image.base64,
          mimetype: 'image/jpeg'
        }        
      }

      const product2 =  {
        userId: '1',
        openDate: new Date(),
        image: {
          size: 40000,
          data: imageData.image.base64,
          mimetype: 'image/png'
        }        
      }

      const addFriend = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
        friendEmail: 'helixia22@hotmail.fr',
        friendName: 'céline',
        userId: '1'
      });
  
      const addProduct1 = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product1
      });

      const addProduct2 = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product2
      });

      // Recherche des relations friend-product
      const productFriendRelation = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriend.friendId);
      const findAllProductsOfFriend = await RepositoryServiceImpl.getRepository().productRepository.findByUserId(addFriend.friendId);

      expect(productFriendRelation.length).toBe(2);
      expect(findAllProductsOfFriend.length).toBe(2)



    } catch (error: any) {
      expect(error).toBeFalsy();
    }
  });

  it('Should throw ImageSizeException because image is to big', async()=>{
    try {
      const product =  {
        userId: '1',
        openDate: new Date(),
        image: {
          size: 600000,
          data: imageData.image.base64,
          mimetype: 'image/jpeg'
        }        
      }
  
      const addProduct = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product
      });
      expect(addProduct).toBeFalsy;
    } catch (error: any) {
      expect(error).toBeInstanceOf(ImageSizeException);
      expect(error.message).toBe(messages.message.imageSizeExceed)
    }    
  })

  it('Should throw AddProductException because image is missing', async()=>{
    try {
      const product =  {
        userId: '1',
        openDate: new Date()
      }
  
      const addProduct = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product
      });

      expect(addProduct).toBeFalsy();

    } catch (error:any) {
      expect(error).toBeInstanceOf(AddProductException);
      expect(error.message).toBe(messages.message.imageMandatory);
    }
  });
});