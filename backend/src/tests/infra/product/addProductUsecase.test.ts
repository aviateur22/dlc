import request from "supertest";
import path from 'path';
import fs from 'fs';
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import { TestUtilities } from "../../utilities/TestUtilities";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('AddProductUsecase', ()=>{
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

  beforeEach(async()=>{
    await UserGenerator.resteUser();
    await ProductGenerator.deleteProduct();
    await ImageGenerator.deleteImage();
    await ProductUserGenerator.deleteProductUser();
  });

  it('Should upload an image', async()=>{

    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .set('content-type', 'application/octet-stream')
    .field('userId', '1')
    .field('openDate',new Date('2023-10-10').toJSON())
    .attach('image', imageToDownload);
    console.log(res.body);
    expect(res.status).toBe(201);
 
    expect(res.body).toHaveProperty('addProduct');
    expect(res.body.addProduct.userId).toBe('1');
    expect(res.body.addProduct.imageId).toBe('1');
    expect(res.body.addProduct.openDate).toBe('2023-10-10T00:00:00.000Z');
  });

  it('Should failed because image is to big', async()=>{
        
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    //console.log(imageToDownload)
    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .field('userId', '1')
    .field('openDate', new Date('2023-10-10').toJSON())
    .set('content-type', 'application/octet-stream')
    .attach('image', imageToDownload2)
    // expect(res.body.message).toBe('message')
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('maximum image size of 5Mo')
  });

  it('Should failed because image is missing', async()=>{
    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .field('userId', '1')
    .field('openDate', new Date('2023-10-10').toJSON())
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
    .field('userId', '')
    .field('openDate', new Date('2023-10-10').toJSON())
    .attach('image', imageToDownload)
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('userId missing')

  });

  it('Should failed because openDate is missing', async()=>{
    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/product')
    .field('userId', '2')
    .field('openDate', '')
    .attach('image', imageToDownload)
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('openDate is missing')

  });


})