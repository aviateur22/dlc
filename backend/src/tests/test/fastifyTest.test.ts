import request from "supertest"
import { ServerSource } from "../../infra/helpers/server/ServerSource";
import { TestUtilities } from "../utilities/TestUtilities";
// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
testUtilities.selectService();

const serviceSelect: number = testUtilities.selectService();

// Jest app
const app = testUtilities.getBackend();

// Configuer app suivant le server
const appTest = testUtilities.getTestApp(app, serviceSelect);

beforeEach(async ()=>{
  await testUtilities.resetParam();
})

describe('add todo', ()=>{
  it('test', async()=>{

    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    const res = await request(appTest)
    
    .post('/api/v1/todo/').send({
      "title":"Mon nouveau titre",
      "description": "Ma nouvelle description"
    }).expect(201);

    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo).toHaveProperty('title');
    expect(res.statusCode).toBe(201);
  });

  it('delete todo', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    const res = await request(appTest)
    
    .delete('/api/v1/todo/1');

    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo).toHaveProperty('title');
    expect(res.statusCode).toBe(200);
  });
})