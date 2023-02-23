import request from 'supertest';
import { SelectServices } from '../domain/utilities/SelectServices';
import { ServerServiceImpl } from '../../infra/services/server/ServerServiceImpl';
import { ServerSource } from '../../infra/helpers/server/ServerSource';
import { TodoGenerator } from '../domain/utilities/TodoGenerator';

describe('findAlltodos', ()=>{
  // Selection Server Express
  const app = ServerServiceImpl.setServer(ServerSource.express);

  // Path
  const path: string = '/api/v1/todo/find-all-todos';

  beforeAll(async()=>{
    // Selection logger
    SelectServices.selectLoggerSource();

    // Repositories
    SelectServices.SelectRepositoriesSource();

    // Clear tous les todos
    await TodoGenerator.ClearAllTodos();

    // Add 2 todos
    await TodoGenerator.CreateTodos();
  });

  it('Should find all the todos avail', async()=>{    
    const res = await request(app)
    .get(path)

    expect(res.body).toHaveProperty('todos');
    expect(res.body.todos).toBeInstanceOf(Array);
    expect(res.body.todos.length).toBe(2);

  });

  it('Should find no todos', async()=>{
    // Clear tous les todos
    await TodoGenerator.ClearAllTodos();
    
    const res = await request(app)
    .get(path)

    expect(res.body).toHaveProperty('todos');
    expect(res.body.todos.length).toBe(0);
  });

})