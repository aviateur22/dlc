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

describe('DeleteFriendRequest', ()=>{
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

  it('Should delete a friend', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    // Ajout d'un ami 
    await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline',
      userId: '1',
    });

    const res = await request(jestApp)
    .delete('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .send({
      userId: '1',
      friendId: '2'
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('friends');
    expect(res.body.friends.length).toBe(2);
  });

  it('Should failed deleting a friend, because friend user not exist', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    // Ajout d'un ami 
    await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline',
      userId: '1',
    });

    const res = await request(jestApp)
    .delete('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .send({
      userId: '1',
      friendId: '3'
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.userNotFind);
  });

  it('Should failed deleting a friend, because friendId isMissing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    // Ajout d'un ami 
    await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline',
      userId: '1',
    });

    const res = await request(jestApp)
    .delete('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .send({
      userId: '1',
      friendId: ''
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.friendIdMissing);
  });

  it('Should failed deleting a friend, because userId isMissing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    // Ajout d'un ami 
    await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline',
      userId: '1',
    });

    const res = await request(jestApp)
    .delete('/api/v1/dlc/friend')
    .set('Cookie', cookies)
    .set('content-type', 'application/json')
    .send({
      userId: '',
      friendId: '2'
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe(messages.message.userIdMissing);
  });
});