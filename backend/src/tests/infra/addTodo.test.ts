import request from 'supertest';
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { ServerSource } from '../../infra/helpers/server/ServerSource';
import { TestUtilities } from "../utilities/TestUtilities";

// Selection Server Express
const testUtilities = new TestUtilities();

// Selection des services pour les tests
const serviceSelect: number = testUtilities.selectService();

describe('AddTodo',()=>{

  // App 
  const app = testUtilities.getBackend();

  // Configuration App pour Jest
  const jestApp = testUtilities.getTestApp(app, serviceSelect);

  // Path
  const path: string = '/api/v1/todo';

  beforeEach(async ()=>{
    await testUtilities.resetParam();
  });

  afterEach(async()=>{
    await testUtilities.resetParam();
    
  })

  console.log('after')
  

  // Ajout d'une todo
  it('Should add a new todo', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    const res = await request(jestApp)
    .post(path)
    .set('Accept', 'application/json')
    .send({
      title: 'mon titre',
      description: 'ma description'
    });

    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

    expect(res.body).toHaveProperty('todo');
    expect(res.statusCode).toBe(201);
    expect(todos.length).toBe(3);    
    expect(todos[0].id.toString()).toBe("3");
    expect(todos[0].title).toBe('mon titre');
  });

  // Ajout d'un todo sans description
  it('Should add a new Todo with an empty description', async ()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    const res = await request(jestApp)    
    .post(path)
    .set('Accept', 'application/json')
    .send({
      title: 'mon titre'
    })

    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

    expect(todos.length).toBe(3);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.title).toBe('mon titre');
    expect(todos[0].title).toBe('mon titre');
    expect(todos[0].description).toBe('');

  })

  // Echec d'ajout car pas de titre
  it('should throw InvalidTodoTitleException because title is missing', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    const res = await request(jestApp)
    .post(path)
    .set('Accept', 'application/json')
    .send({
      description: 'ma description'
    });

    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('title is mandatory');
    expect(res.statusCode).toBe(400);
    expect(todos.length).toBe(2);
  });

  // Ajout todo sans description
  it('Should add a todo with an empty description', async()=>{
    if(serviceSelect === ServerSource.fastify) {
      await app.ready();
    }
    
    const res = await request(jestApp)
    .post(path)
    .set('Accept', 'application/json')
    .send({
      title: 'mon titre'
    });

    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

    expect(res.body).toHaveProperty('todo');
    expect(res.statusCode).toBe(201);
    expect(res.body.todo).toHaveProperty('title');
    expect(res.body.todo.title).toBe('mon titre');
    expect(todos.length).toBe(3);
    expect(todos[0].title).toBe('mon titre');
    expect(todos[0].description).toBe('');
  })
});