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
    await UserFriendGenerator.deleteAllUserFriendRelations();
    await ProductGenerator.createProduct();
  });
  
  it('Should delete the product of a user', async()=>{
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

  it('Should delete products of a user and his friends', async()=>{
    try {

      // Ajouts de 2 produits pour le userId = 1
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

      // Ajouts de 2 produits pour le userId = 2
      const product3 =  {
        userId: '2',
        openDate: new Date(),
        image: {
          size: 50000,
          data: imageData.image.base64,
          mimetype: 'image/jpeg'
        }        
      }

      const product4 =  {
        userId: '2',
        openDate: new Date(),
        image: {
          size: 40000,
          data: imageData.image.base64,
          mimetype: 'image/png'
        }        
      }

      // Ajouts de 3 produits pour le userId = 3
      const product5 =  {
        userId: '3',
        openDate: new Date(),
        image: {
          size: 50000,
          data: imageData.image.base64,
          mimetype: 'image/jpeg'
        }        
      }

      const product6 =  {
        userId: '3',
        openDate: new Date(),
        image: {
          size: 40000,
          data: imageData.image.base64,
          mimetype: 'image/png'
        }        
      }

      const product7 =  {
        userId: '3',
        openDate: new Date(),
        image: {
          size: 40000,
          data: imageData.image.base64,
          mimetype: 'image/png'
        }        
      }

      // Ajout nouvelle personne
      const {email, password} = {email: 'enaly22@hotmail.fr', password: 'dd'};      
      await UseCaseServiceImpl.getUseCases().userUsecase.registerUserUseCase.execute({ email, password });

      // Ajout ami user1
      const addFriendRelation1 = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
        friendEmail: 'helixia22@hotmail.fr',
        friendName: 'céline',
        userId: '1'
      });

      // Ajout ami user2
      const addFriendRelation2 = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
        friendEmail: 'enaly22@hotmail.fr',
        friendName: 'céline',
        userId: '2'
      });
  
      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product1
      });

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product2
      });

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product3
      });

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product4
      });

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product5
      });

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product6
      });

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product7
      });
      
      // Recherche relations userId = 1
      let productFriendRelationUser1 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');
      let findAllProductsOfFriendUser1  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('1');

      // Recherche relation userId = 2
      let productFriendRelationUser2  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');
      let findAllProductsOfFriendUser2  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('2');

      // Recherche relation userId = 3
      let productFriendRelationUser3  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('3');
      let findAllProductsOfFriendUser3  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('3');


      expect(productFriendRelationUser1.length).toBe(3);
      expect(findAllProductsOfFriendUser1.length).toBe(3);

      expect(productFriendRelationUser2.length).toBe(2);
      expect(findAllProductsOfFriendUser2.length).toBe(2);

      expect(productFriendRelationUser3.length).toBe(3);
      expect(findAllProductsOfFriendUser3.length).toBe(3)

      // Suppr. produit user 1
      let product = {
        productId:'1',
        userId: '1'
      }
  
      let deleteProduct = await UseCaseServiceImpl.getUseCases().productUsecase.deleteProductUseCase.execute({
        ...product
      });

      // Recherche relation userId = 1
      productFriendRelationUser1 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');
      findAllProductsOfFriendUser1  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('1');

      // Recherche relation userId = 2
      productFriendRelationUser2  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');
      findAllProductsOfFriendUser2  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('2');

      // Recherche relation userId = 3
      productFriendRelationUser3  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('3');
      findAllProductsOfFriendUser3  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('3');

      expect(productFriendRelationUser1.length).toBe(2);
      expect(findAllProductsOfFriendUser1.length).toBe(2);

      expect(productFriendRelationUser2.length).toBe(2);
      expect(findAllProductsOfFriendUser2.length).toBe(2);

      expect(productFriendRelationUser3.length).toBe(3);
      expect(findAllProductsOfFriendUser3.length).toBe(3);

      // Validation relation relationId = 1    
      const acceptFriendRelationUser1 = await UseCaseServiceImpl.getUseCases().relationUseCase.acceptFriendRelationUseCase.execute('1');

      // Recherche relation userId = 1
      productFriendRelationUser1 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');
      findAllProductsOfFriendUser1  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('1');

      // Recherche relation userId = 2
      productFriendRelationUser2  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');
      findAllProductsOfFriendUser2  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('2');

      expect(productFriendRelationUser1.length).toBe(4);
      expect(findAllProductsOfFriendUser1.length).toBe(4);

      expect(productFriendRelationUser2.length).toBe(4);
      expect(findAllProductsOfFriendUser2.length).toBe(4);

      expect(productFriendRelationUser3.length).toBe(3);
      expect(findAllProductsOfFriendUser3.length).toBe(3);

      // Validation des relation relationId = 2    
      const acceptFriendRelationUser2 = await UseCaseServiceImpl.getUseCases().relationUseCase.acceptFriendRelationUseCase.execute('2');

      // Recherche relation userId = 1
      productFriendRelationUser1 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');
      findAllProductsOfFriendUser1  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('1');

      // Recherche relation userId = 2
      productFriendRelationUser2  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');
      findAllProductsOfFriendUser2  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('2');

      // Recherche relation userId = 3
      productFriendRelationUser3 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('3');
      findAllProductsOfFriendUser3  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('3');

      expect(productFriendRelationUser1.length).toBe(4);
      expect(findAllProductsOfFriendUser1.length).toBe(4);

      expect(productFriendRelationUser2.length).toBe(7);      
      expect(findAllProductsOfFriendUser2.length).toBe(7);

      expect(productFriendRelationUser3.length).toBe(5);
      expect(findAllProductsOfFriendUser3.length).toBe(5);

      // Ajout nouveau produit sur userId = 3
      const product8 =  {
        userId: '3',
        openDate: new Date(),
        image: {
          size: 40000,
          data: imageData.image.base64,
          mimetype: 'image/png'
        }        
      }

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product8
      });

      // Recherche relation userId = 1
      productFriendRelationUser1 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');
      findAllProductsOfFriendUser1  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('1');

      // Recherche relation userId = 2
      productFriendRelationUser2  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');
      findAllProductsOfFriendUser2  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('2');

      // Recherche relation userId = 3
      productFriendRelationUser3 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('3');
      findAllProductsOfFriendUser3  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('3');

      console.log(productFriendRelationUser3);

      expect(productFriendRelationUser1.length).toBe(4);
      expect(findAllProductsOfFriendUser1.length).toBe(4);

      expect(productFriendRelationUser2.length).toBe(8);      
      expect(findAllProductsOfFriendUser2.length).toBe(8);

      expect(productFriendRelationUser3.length).toBe(6);
      expect(findAllProductsOfFriendUser3.length).toBe(6);

      // Ajout nouveau produit sur userId = 1
      const product9 =  {
        userId: '1',
        openDate: new Date(),
        image: {
          size: 40000,
          data: imageData.image.base64,
          mimetype: 'image/png'
        }        
      }

      await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
        ...product9
      });

      // Recherche relation userId = 1
      productFriendRelationUser1 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');
      findAllProductsOfFriendUser1  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('1');

      // Recherche relation userId = 2
      productFriendRelationUser2  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');
      findAllProductsOfFriendUser2  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('2');

      // Recherche relation userId = 3
      productFriendRelationUser3 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('3');
      findAllProductsOfFriendUser3  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('3');

      expect(productFriendRelationUser1.length).toBe(5);
      expect(findAllProductsOfFriendUser1.length).toBe(5);

      expect(productFriendRelationUser2.length).toBe(9);      
      expect(findAllProductsOfFriendUser2.length).toBe(9);

      expect(productFriendRelationUser3.length).toBe(6);
      expect(findAllProductsOfFriendUser3.length).toBe(6);

      // Suppr. produit user 1
      product = {
        productId:'2',
        userId: '1'
      }
  
      deleteProduct = await UseCaseServiceImpl.getUseCases().productUsecase.deleteProductUseCase.execute({
        ...product
      });

      // Recherche relation userId = 1
      productFriendRelationUser1 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');
      findAllProductsOfFriendUser1  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('1');

      // Recherche relation userId = 2
      productFriendRelationUser2  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');
      findAllProductsOfFriendUser2  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('2');

      // Recherche relation userId = 3
      productFriendRelationUser3 = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('3');
      findAllProductsOfFriendUser3  = await RepositoryServiceImpl.getRepository().productRepository.findByUserId('3');

      expect(productFriendRelationUser1.length).toBe(4);
      expect(findAllProductsOfFriendUser1.length).toBe(4);

      expect(productFriendRelationUser2.length).toBe(8);      
      expect(findAllProductsOfFriendUser2.length).toBe(8);

      expect(productFriendRelationUser3.length).toBe(6);
      expect(findAllProductsOfFriendUser3.length).toBe(6);



    } catch (error: any) {
      //console.log(error)
      expect(error).toBeFalsy();      
    }
  });
})