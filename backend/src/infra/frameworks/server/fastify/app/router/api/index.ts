import { FastifyInstance } from "fastify";
import todo from './todo';

export default async function routes(fastify: FastifyInstance, options: Object ) {
  // Router todo
  fastify.register(todo, {prefix: '/todo'});
}