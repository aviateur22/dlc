import request from "supertest";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { ServerSource } from "../../infra/helpers/server/ServerSource";
import { TestUtilities } from "../utilities/TestUtilities";

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
const serviceSelect = testUtilities.selectService();

describe('UpdateTodo', ()=>{

  // Server
  const app = testUtilities.getBackend();

  // Configuration App pour Jest
  const jestApp = testUtilities.getTestApp(app, serviceSelect);
  let path = '/api/v1/todo/2'

  beforeEach(async()=>{
    await testUtilities.resetParam();
  });

  afterEach(async()=>{
    await testUtilities.resetParam();
  });
 
  // Update Todo
  it('should update a Todo', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    const res = await request(jestApp)
    .patch(path)    
    .send({     
      title: 'mon titre mis a jour',
      description: 'ma description mis a jour',
      status: true
    })

    // Récupération des Todos
    const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute({
      id: '2'
    });
    
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id.toString()).toBe('2')
    expect(res.body.todo.title).toBe('mon titre mis a jour');
    expect(res.body.todo.description).toBe('ma description mis a jour');

    // Todos
    expect(findTodo.title).toBe('mon titre mis a jour');
  });

  // Mise a jour todo avec description vide
  it('Should update a Todo with an empty description', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    const res = await request(jestApp)
    .patch(path)    
    .send({
      title: 'mon titre mis a jour',
      description: '',
      status: true
    })

    // Récupération des Todos
    const findTodo = await UseCaseServiceImpl.getUseCases().findOneTodoUseCase.execute({
      id: '2'
    });
    
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id.toString()).toBe('2')
    expect(res.body.todo.title).toBe('mon titre mis a jour');
    expect(res.body.todo.description).toBe('');

    // Todos
    expect(findTodo.title).toBe('mon titre mis a jour');

  });

  // Todo absente d ela base de données
  it('Should throw TodoNotfindException because Todo does not exist', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    path = '/api/v1/todo/5'
    const res = await request(jestApp)
    .patch(path)    
    .send({
      title: 'mon titre mis a jour',
      description: 'ma description mis a jour',
      status: true
    });

    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('todo not find');
  });

  // Todo - titre manuqant
  it('Should throw ValidationException because Title is missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    const res = await request(jestApp)
    .patch(path)    
    .send({
      title: '',
      description: 'ma nouvelle description',
      status: true
    });
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('title is mandatory');
  });

  // Todo - status manquant
  it('Should throw ValidationException because status is missing', async()=>{
    const res = await request(jestApp)
    .patch(path)    
    .send({     
      title: 'mon noveau titre',
      description: 'ma nouvelle description',      
    });
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('status is mandatory');

  });
})