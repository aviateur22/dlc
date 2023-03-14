import { ServerException } from '../../../exceptions/ServerException';
import express from '../../frameworks/server/express/app';
import fastify from '../../frameworks/server/fastify/app';
import { ServerSource } from './ServerSource';
/**
 * Selection du server
 */
export class ServerSelection {

  /**
   * Selection du server
   * @param { number } serverSource
   * @returns { any }
   */
  getServer(serverSource:number): any {
    switch(serverSource) {

      // Express
      case ServerSource.express: 
        return this.loadExpress(); 
      break;

      // Fastfiy
      case ServerSource.fastify:
        return this.loadFastify();
      break;

      default: throw new ServerException('Server not configure');
    }
  }

  /**
   * Chargement server avec Express
   * @returns {any} - Express
   */
  loadExpress(): any {
    return express;
  }

  /**
   * Chargement server avec Fastify
   * @returns { any } - Fastify
   */
  loadFastify():any {
    return fastify;
  }
}