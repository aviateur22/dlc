import request from "supertest";
import messages from "../../../domain/messages/messages";
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('DeleteUseCase', ()=>{
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
    await ProductGenerator.createProduct();
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

    expect(res.headers['set-cookie'].length).toBe(1);
    cookies = res.headers['set-cookie'];
    token = res.body.token
  })
     
  it('Should delete a product', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .delete('/api/v1/dlc/product/1')
    .set('Cookie', cookies)
    .send({
      userId: '1',
      token
    })
    
    expect(res.status).toBe(200); 
    expect(res.body).toHaveProperty('product');

  });

  it('Should throw ActionNotAllowedException because product don\'t belong to user', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .delete('/api/v1/dlc/product/1')
    .set('Cookie', cookies)
    .send({
      userId: '2',
      token
    })
    
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.productNotBelongToUser);

  });
});