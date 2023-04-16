import request from "supertest";
import { ServerSource } from "../../../infra/helpers/server/ServerSource";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";

describe('FindFriendsRequest', ()=>{
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

  it('Should getAll friends of user', async()=>{

    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    // Ajout relation
    const { friendEmail, name, userId } = { friendEmail: 'helixia22@hotmail.fr', name: 'céline', userId: '1'};

    await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail,
      friendName: name,
      userId
    });  

    // Accepte la relation
    await UseCaseServiceImpl.getUseCases().relationUseCase.acceptFriendRelationUseCase.execute('1');
    
    const res = await request(jestApp)
    .get('/api/v1/dlc/friend/find-friends/1')
    .set('content-type', 'application/json')
    .set('Cookie', cookies)
    .set('token', token)
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('friends');
    expect(res.body.friends.length).toBe(1);
  });
})