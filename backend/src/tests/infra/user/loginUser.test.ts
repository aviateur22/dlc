import request from "supertest";
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('LoginUser', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  const serviceSelect: number = testUtilities.selectService();

  // App 
  const app = testUtilities.getBackend();

  // Configuration App pour Jest
  const jestApp = testUtilities.getTestApp(app, serviceSelect);

  beforeEach(async()=>{
    await UserGenerator.resteUser();
    await ProductGenerator.deleteProduct();
    await ImageGenerator.deleteImage();
    await ProductUserGenerator.deleteProductUser();
  });
  
  it('Should login a user', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/login')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmail.fr",
      password: "d"
    })

    expect(res.status).toBe(200); 
    
  })
})