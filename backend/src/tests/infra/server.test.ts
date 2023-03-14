import request from 'supertest';
import { Server } from './utilities/server';
import { SelectServices } from '../domain/utilities/SelectServices';
import { ServerSource } from '../../infra/helpers/server/ServerSource';
import { ServerServiceImpl } from '../../infra/services/server/ServerServiceImpl';

describe('StartServer', ()=>{

  // Selection Server Express
  const app = ServerServiceImpl.setServer(ServerSource.express);

  // Selection logger
  SelectServices.selectLoggerSource();

  // Repositories
  SelectServices.SelectRepositoriesSource();
  
  // Start Server et vérification
  it('Should Start a server and get message "Bienvenue sur l\'API des Todos"', async()=>{
    const server = new Server('5000');
    await server.startServer();

    const res = await request(app)
      .get('/api/v1/todo');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Bienvenue sur l\'API des Todos');
  });

  // Path invalide
  it('Path Should throw error 404 because path is unvalid', async()=>{
    const res = await request(app)
      .get('/api/v1/unvalid-path');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('invalid path');
  });

  // Path avec controller en erreur
  it('Path Should throw error 500', async()=>{
    const res = await request(app)
      .get('/test-error');

    expect(res.statusCode).toBe(500);
    //expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('server error');
  });

  // Path avec Erreur managé
  it('Path Should throw error 400', async()=>{
    const res = await request(app)
    .get('/test-error-managed');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('managed error');
  });

  // Path vérification email
  it('Should throw error 400 because email format is not valid', async()=>{
    const res = await request(app)
    .post('/test-email')
    .set('Accept', 'application/json')
    .send({
      email: 'avia'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errorMessage');
    expect(res.body.errorMessage).toBe('incorrect email format');
  });

  // Path vérification email
  it('Should res with a statusCode of 200 because meail is valid', async()=>{
    const res = await request(app)
    .post('/test-email')
    .set('Accept', 'application/json')
    .send({
      email: 'avia@hotmail.fr'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('done');
  });
});