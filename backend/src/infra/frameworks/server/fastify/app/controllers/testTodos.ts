import { FastifyReply, FastifyRequest } from "fastify";
import { TodoDataAccess } from "../../../../../helpers/dataAccess/TodoDataAccess";

export default  {
  /**
   * 
   * @param {FastifyRequest} request 
   * @param {FastifyReply} reply 
   */
  findAllTodos : async(request: FastifyRequest, reply: FastifyReply)=>{
    const todos = await TodoDataAccess.findAllTodos();
    console.log(todos)
    reply.send({
      todos
    });
  },

  saveOneTodo: async(request: FastifyRequest, reply: FastifyReply)=>{
    //const { name, description } = request.body;
    console.log(request.body);
    reply.send({
      
    });
  }
}