import request from "supertest";
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import messages from "../../../domain/messages/messages";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('RegisterUser', ()=>{
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

  it('Should register a user', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/register')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@yahoo.fr",
      password: "dDdddddd1@",
      confirmPassword: "dDdddddd1@"
    });

    expect(res.status).toBe(201);
  });

  it('Should reject a register because bad email format', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/register')    
    .set('content-type', 'application/json')
    .send({
      email: "hdhdhd",
      password: "dDdddddd1@",
      confirmPassword: "dDdddddd1@"
    });

    expect(res.status).toBe(400);
    expect(res.body).
    toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.emailFormatError);

  });

  it('Should reject a register because paswword is missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/register')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmail.fr",
      password: "",
      confirmPassword: "dDdddddd1@"
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.passwordMandatory);
  });

  it('Should reject a register because confirmPaswword missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/register')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmail.fr",
      password: "dDdddddd1@",
      confirmPassword: ""
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.confirmPasswordError);
  });

  it('Should reject a register because password and confirmPaswword are not equal', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/register')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmail.fr",
      password: "dDdddddd1@",
      confirmPassword: "dDddddd1@"
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.confirmPasswordError);
  });

  it('Should reject a register because email is missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/register')    
    .set('content-type', 'application/json')
    .send({
      email: "",
      password: "dDdddddd1@",
      confirmPassword: "dDdddddd1@"
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.emailMandatory);

  });

  it('Should reject a regist because email exist', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/user/register')    
    .set('content-type', 'application/json')
    .send({
      email: "aviateur22@hotmail.fr",
      password: "dDdddddd1@",
      confirmPassword: "dDdddddd1@"
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.emailExist);

  });
})