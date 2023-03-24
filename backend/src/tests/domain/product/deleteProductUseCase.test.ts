import { ProductEntity } from "../../../domain/entities/product/ProductEntity";
import messages from "../../../domain/messages/messages";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { ActionNotAllowedException } from "../../../exceptions/ActionNotAllowedException";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import imageData from "../../utilities/imageData.json"
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('DeleteProductUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  beforeEach(async()=>{
    await UserGenerator.resteUser();
    await ProductGenerator.deleteProduct();
    await ImageGenerator.deleteImage();
    await ProductUserGenerator.deleteProductUser();
    await UserFriendGenerator.deleteUserProducts();
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
      
      expect(deleteProduct).toBeInstanceOf(ProductEntity);
      expect(products.length).toBe(0);
      expect(images.length).toBe(0);
      expect(productsUsers.length).toBe(0);

    } catch (error) {
      expect(error).toBeFalsy();
    }    
  });

  it('Should failed because product doesn\'t belong to user', async()=>{
    try {
      const product = {
        productId:'1',
        userId: '2'
      }
  
      const deleteProduct = await UseCaseServiceImpl.getUseCases().productUsecase.deleteProductUseCase.execute({
        ...product
      });  

      const products = await RepositoryServiceImpl.getRepository().productRepository.findAll();
      const images = await RepositoryServiceImpl.getRepository().imageRepository.findAll();
      const productsUsers = await RepositoryServiceImpl.getRepository().productUserRepository.findAll();      
      
      expect(deleteProduct).toBeFalsy();
      expect(products.length).toBe(1);
      expect(images.length).toBe(1);
      expect(productsUsers.length).toBe(1);

    } catch (error: any) {
      expect(error).toBeInstanceOf(ActionNotAllowedException);
      expect(error.message).toBe(messages.message.productNotBelongToUser)
    } 
  });

  it('Should delete products of the friend', async()=>{
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
  
      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product1
      });

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product2
      });
      
      // Recherche des relations friend-product
      let productFriendRelation = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriend.friendId);
      let findAllProductsOfFriend = await RepositoryServiceImpl.getRepository().productRepository.findByUserId(addFriend.friendId);

      expect(productFriendRelation.length).toBe(3);
      expect(findAllProductsOfFriend.length).toBe(3)

      // Suppr. produit
      const product = {
        productId:'1',
        userId: '1'
      }
  
      const deleteProduct = await UseCaseServiceImpl.getUseCases().productUsecase.deleteProductUseCase.execute({
        ...product
      });
      
      // Recherche des relations friend-product
      productFriendRelation = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriend.friendId);
      findAllProductsOfFriend = await RepositoryServiceImpl.getRepository().productRepository.findByUserId(addFriend.friendId);

      console.log(addFriend.friendId)
      expect(productFriendRelation.length).toBe(2);
      expect(findAllProductsOfFriend.length).toBe(2)

    } catch (error: any) {
      //console.log(error)
      expect(error).toBeFalsy();      
    }
  });
})