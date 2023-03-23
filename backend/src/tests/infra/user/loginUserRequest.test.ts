import request from "supertest";
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import messages from "../../../domain/messages/messages";
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
    });

    expect(res.headers['set-cookie'].length).toBe(1);
    expect(res.status).toBe(200);
  });  

  it('Should recieve and errorMessage because email is missing', async ()=>{
    const res = await request(jestApp)
    .post('/api/v1/dlc/user/login')    
    .set('content-type', 'application/json')
    .send({
      email: "",
      password: "d"
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.emailMandatory);
  });

  it('Should recieve and errorMessage because password is missing', async ()=>{
    const res = await request(jestApp)
    .post('/api/v1/dlc/user/login')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmail.fr",
      password: ""
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.passwordMandatory);
  });

  it('Should recieve and errorMessage because email is unvalid', async ()=>{
    const res = await request(jestApp)
    .post('/api/v1/dlc/user/login')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmal.fr",
      password: "d"
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.emailOrPasswordFailed);

  });

  it('Should recieve an errorMessage because password is unvalid', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/login')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmail.fr",
      password: "dd"
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.emailOrPasswordFailed);
  });

})