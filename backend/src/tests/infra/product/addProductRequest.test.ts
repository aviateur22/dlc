import request from "supertest";
import path from 'path';
import fs from 'fs';
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import { TestUtilities } from "../../utilities/TestUtilities";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";
import messages from "../../../domain/messages/messages";


describe('AddProductRequest ', ()=>{
  const imageToDownload = path.join(process.cwd(),'./src/tests/utilities/image.jpg');
  const imageToDownload2 = path.join(process.cwd(),'./src/tests/utilities/image2.png');

  fs.access(imageToDownload, (err) => {
    if (err) {
      console.error(err)
      throw new Error('file is not found')
    }
  });

  fs.access(imageToDownload2, (err) => {
    if (err) {
      console.error(err)
      throw new Error('file is not found')
    }
  });


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

  it('Should upload a product', async()=>{

    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .set('Cookie', cookies)
    .set('content-type', 'application/octet-stream')
    .field('userId', '1')
    .field('openDate',new Date('2023-10-10').toJSON())
    .field('token', token)
    .attach('image', imageToDownload);

    expect(res.status).toBe(201); 
    expect(res.body).toHaveProperty('product');
    expect(res.body.product.userId).toBe('1');
    expect(res.body.product.imageId).toBe('1');
    expect(res.body.product.openDate).toBe('2023-10-10T00:00:00.000Z');
   
  });

  it('Should failed because image is to big', async()=>{
        
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .set('Cookie', cookies)
    .field('userId', '1')
    .field('openDate', new Date('2023-10-10').toJSON())
    .field('token', token)
    .set('content-type', 'application/octet-stream')
    .attach('image', imageToDownload2)
    // expect(res.body.message).toBe('message')
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.imageSizeExceed)
  });

  it('Should failed because image is missing', async()=>{
    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .field('userId', '1')
    .field('openDate', new Date('2023-10-10').toJSON())
    .set('Cookie', cookies)
    .attach('image', '')
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('no file uploaded')

  });

  it('Should failed because userId is missing', async()=>{
    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .set('Cookie', cookies)
    .field('userId', '')
    .field('openDate', new Date('2023-10-10').toJSON())
    .attach('image', imageToDownload)
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.userIdMissing)

  });

  it('Should failed because openDate is missing', async()=>{
    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .set('Cookie', cookies)
    .field('userId', '2')
    .field('openDate', '')
    .attach('image', imageToDownload)
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.openDateMising)

  });


})