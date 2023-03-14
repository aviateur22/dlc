import request from 'supertest';
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { ServerSource } from '../../infra/helpers/server/ServerSource';
import { TestUtilities } from '../utilities/TestUtilities';
//import { BeforeTest } from '../utilities/BeforeTest';

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
const serviceSelect = testUtilities.selectService();

// Suppression d'une Todo
describe('DeleteOne Todo', ()=>{
  // Server
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
  });

  // Succes suppression Todo
  it('Should delete one Todo', async()=>{    
    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .delete(path)

    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id.toString()).toBe('1');
    expect(todos.length).toBe(1);
  });

  // Echec Suppression Todo
  it('Should Throw TodoNotFindException because Todo doas not exist', async()=>{

    path = '/api/v1/todo/10';

    
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    const res = await request(jestApp)
    .delete(path);

    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('todo not find');
    expect(todos.length).toBe(2);
  });
});