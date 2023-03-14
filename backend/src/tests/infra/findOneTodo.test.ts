import { ServerSource } from "../../infra/helpers/server/ServerSource";
import { ServerServiceImpl } from "../../infra/services/server/ServerServiceImpl";
import { BeforeTest } from "./utilities/BeforeTest";
import request from 'supertest';

describe('FindOne Todo', ()=>{
  // Server
  const app = ServerServiceImpl.setServer(ServerSource.express);

  // Path
  let path = '/api/v1/todo/1'

  beforeEach(async()=>{
    await BeforeTest.resetParameter();
  });

  // Recherche d'une Todo
  it('Should find the Todo', async()=>{

    const res = await request(app)
    .get(path)

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo');
    expect(res.body.todo.id).toBe('1');
    expect(res.body.todo.title).toBe('Title 1');
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
})