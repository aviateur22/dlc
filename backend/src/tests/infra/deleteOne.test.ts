import { BeforeTest } from "./utilities/BeforeTest";
import request from 'supertest';
import { ServerSource } from "../../infra/helpers/server/ServerSource";
import { ServerServiceImpl } from "../../infra/services/server/ServerServiceImpl";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";

// Suppression d'une Todo
describe('DeleteOne Todo', ()=>{
  // Server
  const app = ServerServiceImpl.setServer(ServerSource.express);

  // Path
  let path = '/api/v1/todo/1'

  beforeEach(async()=>{
    BeforeTest.resetParameter();
  });

  // Succes suppression Todo
  it('Should delete one Todo', async()=>{
    const res = await request(app)
    .delete(path)

    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id).toBe('1');
    expect(todos.length).toBe(1);
  });

  // Echec Suppression Todo
  it('Should Throw TodoNotFindException because Todo doas not exist', async()=>{

    path = '/api/v1/todo/10'

    const res = await request(app)
    .delete(path);

    // Récupération des Todos
    const todos = await UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('todo not find');
    expect(todos.length).toBe(2);
  });
});