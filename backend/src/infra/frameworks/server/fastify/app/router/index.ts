import fastify, { FastifyInstance } from "fastify";
import api from './api';
import routerTest from './api/routerTest';

export default async function routes(fastify: FastifyInstance, options: Object ) {
  // Router todo
  fastify.register(api, {prefix: '/api/v1'});

  // Router test
  fastify.register(routerTest);
}
