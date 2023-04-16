import request from "supertest";
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { RelationGenerator } from "../../utilities/RelationGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";
import imageData from "../../utilities/imageData.json"
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import messages from "../../../domain/messages/messages";

describe('AcceptRelationRequest', ()=>{
   // Selection Server Express
   const testUtilities = new TestUtilities();

   // Selection des services pour les tests
   const serviceSelect: number = testUtilities.selectService();
 
   // App 
   const app = testUtilities.getBackend();
 
   // Configuration App pour Jest
   const jestApp = testUtilities.getTestApp(app, serviceSelect);
 
   // Récupération cookies
   let cookies: any;
 
   // Token csurf
   let token: string = '';
 
   beforeEach(async()=>{
     await UserGenerator.resteUser();
     await ProductGenerator.deleteProduct();
     await ImageGenerator.deleteImage();
     await ProductUserGenerator.deleteProductUser();
     await UserFriendGenerator.deleteAllUserFriendRelations();
     await RelationGenerator.addRelation();
   });

   it('Should login user to get a cookie', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/login')
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmail.fr",
      password: "d"
    });

    expect(res.status).toBe(200);
    expect(res.headers['set-cookie'].length).toBe(1);
    expect(res.body).toHaveProperty('token');
    cookies = res.headers['set-cookie'];
    token = res.body.token
  });

  it('Should accept a relation', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/relation')
    .set('content-type', 'application/json')
    .set('Cookie', cookies)
    .send({
      relationId: "1",
      token: token
    });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('relation');
    expect(res.body.relation).toEqual(expect.objectContaining({
      id: '1',
      isNew: false,
      isAcceppted: true,
      friendId: '2',
      createdAt: res.body.relation.createdAt,
      updatedAt: res.body.relation.updatedAt
    }));
    
  });

  it('Should add product of user -> on friend', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
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

    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...product1
    });

    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...product2
    });

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

    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...product3
    });

    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...product4
    });  

    // Recherche produits userId = 2
    let productUser1FromUserRepository  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');

    expect(productUser1FromUserRepository.length).toBe(2);

    const res = await request(jestApp)
    .post('/api/v1/dlc/relation')
    .set('content-type', 'application/json')
    .set('Cookie', cookies)
    .send({
      relationId: "1",
      token
    });
 
    expect(res.status).toBe(200);

    // Recherche produits userId = 2
    productUser1FromUserRepository  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('2');

   expect(productUser1FromUserRepository.length).toBe(4);
  });

  it('Should add product of friend -> on user', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    // Ajouts de 1 produits pour le userId = 1
    const product1 =  {
      userId: '1',
      openDate: new Date(),
      image: {
        size: 50000,
        data: imageData.image.base64,
        mimetype: 'image/jpeg'
      }        
    }

    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...product1
    }); 

    // Ajouts produits pour le userId = 1
    const product3 =  {
      userId: '2',
      openDate: new Date(),
      image: {
        size: 50000,
        data: imageData.image.base64,
        mimetype: 'image/jpeg'
      }        
    }

    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...product3
    });    

     // Recherche relations userId = 1
     let productUser1FromUserRepository  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');

     expect(productUser1FromUserRepository.length).toBe(1);

    const res = await request(jestApp)
    .post('/api/v1/dlc/relation')
    .set('content-type', 'application/json')
    .set('Cookie', cookies)
    .send({
      relationId: "1",
      token
    });
 
    expect(res.status).toBe(200);

    // Recherche produits userId = 1
    productUser1FromUserRepository  = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1');

   expect(productUser1FromUserRepository.length).toBe(2);

  });

  it('Should send an errorMessage because relation does not exist', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/relation')
    .set('content-type', 'application/json')
    .set('Cookie', cookies)
    .send({
      relationId: "2",
      token
    });
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.relationMissing);
    
    
  })

  it('Should send an errorMessage because relationId is missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/relation')
    .set('content-type', 'application/json')
    .set('Cookie', cookies)
    .send({
      relationId: "",
      token
    });
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.relationIdMissing);
    
    
  })

});