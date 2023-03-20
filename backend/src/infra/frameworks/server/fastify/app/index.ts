import Fastify from 'fastify';
import router from './router';
import cors from '@fastify/cors';
import corsOption from './helpers/corsOption';
import erros from './middlewares/erros';

const fastify = Fastify({
  logger: true
});

// Cors
fastify.register(cors, corsOption());

// Router
fastify.register(router);

// Gestion des erreurs
fastify.setErrorHandler(erros);

export default fastify;