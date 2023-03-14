import request from 'supertest';
import { TodoGenerator } from '../utilities/TodoGenerator';
import { TestUtilities } from '../utilities/TestUtilities';
import { ServerSource } from '../../infra/helpers/server/ServerSource';

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
const serviceSelect: number = testUtilities.selectService();

describe('findAlltodos', ()=>{
  // Jest app
  const app = testUtilities.getBackend();

  // Configuration App pour Jest
  const jestApp = testUtilities.getTestApp(app, serviceSelect);

  // Path
  const path: string = '/api/v1/todo/find-all-todos';

  beforeEach(async()=>{
    await testUtilities.resetParam();
  });

  afterEach(async()=>{
    await testUtilities.resetParam();
  });

  it('Should find all the todos avail', async()=>{  
    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .get(path)

    expect(res.body).toHaveProperty('todos');
    expect(res.body.todos).toBeInstanceOf(Array);
    expect(res.body.todos.length).toBe(2);

  });

  it('Should find no todos', async()=>{
    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    // Clear tous les todos
    await TodoGenerator.ClearAllTodos();

    const res = await request(jestApp)
    .get(path)

    expect(res.body).toHaveProperty('todos');
    expect(res.body.todos.length).toBe(0);
  });

})