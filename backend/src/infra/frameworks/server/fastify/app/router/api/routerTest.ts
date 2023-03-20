import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ErrorTestException } from "../../../../../../../exceptions/ErrorTestException";
import schemaTest from "../../middlewares/validations/todo/schemaTest";

export default async function routerTest(fastify: FastifyInstance, options: Object ) {
    /**
   * Erreur
   */
    fastify.get('/test-error', (request: FastifyRequest, reply: FastifyReply)=>{
      throw new Error('Error Test');
    }); 


  /**
   * Erreur managé
   */
  fastify.get('/test-error-managed',(request: FastifyRequest, reply: FastifyReply)=>{
    throw new ErrorTestException('managed error');
  });


  /**
   * Test validation de données
   */
  fastify.post('/test-email', schemaTest, (request: FastifyRequest, reply: FastifyReply)=>{
    message: 'done'
  });

  fastify.get('/router-test', async (request, reply)=>{
    reply.send({
      message: 'Test du router'
    });
  });

  fastify.post('/router-test', async (request, reply)=>{
    reply.send({
      message: 'test du routeur'
    });
  })
}
