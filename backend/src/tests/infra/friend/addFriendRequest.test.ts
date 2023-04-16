import request from "supertest";
import messages from "../../../domain/messages/messages";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('AddFriendRequest', ()=>{
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
    await UserFriendGenerator.deleteAllUserFriendRelations()
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

  it('Should add a new friend', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .set('token', token)
    .send({
      userId: '1',
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('friends');
    expect(res.body.friends.length).toBe(2);  
    console.log(res.body)  

  });

  it('Should failed adding a friend, because relation already exist', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    // Ajout d'un ami 
    const addFriend = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline',
      userId: '1'
    });


    const res = await request(jestApp)
    .post('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .set('token', token)
    .send({
      userId: '1',
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline',    
    });
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.friendRelationAlreadyExist);
  });

  it('Should failed adding a friend, because email does not exist', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .set('token', token)
    .send({
      userId: '1',
      friendEmail: 'helixia22@yahoo.fr',
      friendName: 'céline'     
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.emailNotFind);
  });

  it('Should failed adding a friend, because friendEmail is missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .set('token', token)
    .send({
      userId: '1',
      friendEmail: '',
      friendName: 'céline'
     
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.friendEmailMissing);
  });

  it('Should failed adding a friend, because of bad format of the friendEmail', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .set('token', token)
    .send({
      userId: '1',
      friendEmail: 'helixia22hotmail.fr',
      friendName: 'céline'    
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.emailFormatError);
  });

  it('Should failed adding a friend, because friendName is missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .set('token', token)
    .send({
      userId: '1',
      friendEmail: 'helixia22@hotmail.fr',
      friendName: '',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.friendNameMissing);
  });

  it('Should failed adding a friend, because userId is missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .post('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .set('token', token)
    .send({
      userId: '',
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline'
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.userIdMissing);
  });
});