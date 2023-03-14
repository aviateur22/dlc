import request from 'supertest';
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { ServerSource } from '../../infra/helpers/server/ServerSource';
import { TestUtilities } from '../utilities/TestUtilities';

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
const serviceSelect = testUtilities.selectService();

// Suppression d'une Todo
describe('ToggleCheck Todo', ()=>{

 // Jest app
 const app = testUtilities.getBackend();

  // Configuration App pour Jest
  const jestApp = testUtilities.getTestApp(app, serviceSelect);

  // Path
  let path = '/api/v1/todo/toggle-check/1';

  beforeEach(async()=>{
    await testUtilities.resetParam();
  });
  
  afterEach(async()=>{
    await testUtilities.resetParam();
  });

  // Succes check Todo
  it('Should check one Todo', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    const res = await request(jestApp)
    .patch(path)
    .send({
      status: true
    });
    
    // Récupération des Todos
    const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute({
      id: "1"
    });

    expect(res.body).toHaveProperty('todo');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id.toString()).toBe('1');
    expect(res.body.todo.status).toBeTruthy();
    expect(findTodo.status).toBeTruthy();
  });

  // Success unCheck Todo
  it('Should unCheck one Todo', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }

    const res = await request(jestApp)
    .patch(path)
    .send({
      status: false
    });
       
    // Récupération des Todos
    const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute({
      id: "1"
    });
    expect(res.body).toHaveProperty('todo');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id.toString()).toBe('1');
    expect(res.body.todo.status).toBeFalsy();
    expect(findTodo.status).toBeFalsy();   
  });

  // Recherhche Todo qui n'existe pas
  it('Should throw TodoNotfindException because Todo does not exist', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    // Path
    path = '/api/v1/todo/5'
    const res = await request(jestApp)
    .get(path)

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('todo not find');
    expect(res.body.todo).toBeFalsy();
  });
});