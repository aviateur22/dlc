import request from 'supertest';
import { ServerSource } from '../../infra/helpers/server/ServerSource';
import { TestUtilities } from "../utilities/TestUtilities";

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
const serviceSelect = testUtilities.selectService();

describe('FindOne Todo', ()=>{
  // Jest app
  const app = testUtilities.getBackend();

  // Configuration App pour Jest
  const jestApp = testUtilities.getTestApp(app, serviceSelect);
  
  // Path
  let path = '/api/v1/todo/1'

  beforeEach(async()=>{
    await testUtilities.resetParam();
  });

  afterEach(async()=>{
    await testUtilities.resetParam();
  })

  // Recherche d'une Todo
  it('Should find the Todo', async()=>{
        
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    const res = await request(jestApp)
    .get(path)

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id.toString()).toBe('1');
    expect(res.body.todo.title).toBe('Title 1');
  });

  // Recherhche Todo qui n'existe pas
  it('Should throw TodoNotfindException because Todo does not exist', async()=>{
    // Path
    path = '/api/v1/todo/5';

    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .get(path)

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('todo not find');
    expect(res.body.todo).toBeFalsy();
  });
})