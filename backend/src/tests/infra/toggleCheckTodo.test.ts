import { BeforeTest } from "./utilities/BeforeTest";
import request from 'supertest';
import { ServerSource } from "../../infra/helpers/server/ServerSource";
import { ServerServiceImpl } from "../../infra/services/server/ServerServiceImpl";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";

// Suppression d'une Todo
describe('ToggleCheck Todo', ()=>{
  // Server
  const app = ServerServiceImpl.setServer(ServerSource.express);

  // Path
  let path = '/api/v1/todo/toggle-check/1'

  beforeEach(async()=>{
    BeforeTest.resetParameter();
  });

  // Succes check Todo
  it('Should check one Todo', async()=>{
    const res = await request(app)
    .patch(path)
    .send({
      status: true
    });
    
    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id).toBe('1');
    expect(res.body.todo.status).toBeTruthy();
    expect(todos[0].status).toBeTruthy();
  });

  // Success unCheck Todo
  it('Should unCheck one Todo', async()=>{
    const res = await request(app)
    .patch(path)
    .send({
      status: false
    });
       
    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id).toBe('1');
    expect(res.body.todo.status).toBeFalsy();
    expect(todos[0].status).toBeFalsy();   
  });

  // Recherhche Todo qui n'existe pas
  it('Should throw TodoNotfindException because Todo does not exist', async()=>{
    // Path
    path = '/api/v1/todo/5'
    const res = await request(app)
    .get(path)

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('todo not find');
    expect(res.body.todo).toBeFalsy();
  });
});