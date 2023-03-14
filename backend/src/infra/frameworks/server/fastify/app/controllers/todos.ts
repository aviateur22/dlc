import fastify, { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ValidationException } from "../../../../../../exceptions/ValidationException";
import { TodoDataAccess } from "../../../../../helpers/dataAccess/TodoDataAccess";

export default  {
  /**
   * Recerhche des Todos
   * @param {FastifyRequest} request 
   * @param {FastifyReply} reply 
   */
  findAllTodos : async(request: FastifyRequest, reply: FastifyReply)=>{
    //throw new ValidationException('test');
    //reply.code(400).send(new ValidationException('Erreur de concenption'))
    const todos = await TodoDataAccess.findAllTodos();
    reply.code(200).send({todos})
  },

  /**
   * Sauvegarde d'une Todo
   * @param {FastifyRequest} request 
   * @param {FastifyReply} reply 
   */
  saveOneTodo: async(request: FastifyRequest<{Body: AddTodoSchema}>, reply: FastifyReply)=>{    
    const { title, description } = request.body;

     // Ajout de la Todo
     const todo = await TodoDataAccess.addTodo(title, description);    

    reply
    .code(201).
    send({todo});
  },

  
  /**
   * Update d'une Todo
   * @param { FastifyRequest } request 
   * @param { FastifyReply } reply 
   */
  updateTodo: async(request: FastifyRequest<{Params: {id: string}, Body: UpdateTodoSchema}>, reply: FastifyReply)=>{
    // Id de la Todo
    const id = request.params.id;

    // Contenu de la Todo
    const { title, description, status } = request.body;

    // Mise a jour de la Todo
    const todo = await TodoDataAccess.updateTodo(id, title, description, status);

    reply.status(200).send({todo})
  },

  /**
   * Recherche d'une Todo
   * @param { FastifyRequest } request 
   * @param { FastifyReply } reply 
   */
  findOneTodo: async(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply)=>{
    // Id de la Todo
    const id: string = request.params.id;

    const todo = await TodoDataAccess.findOneTodo(id);

    reply.send({ todo })
  },
  
  /**
   * Suppression d'une Todo
   * @param { FastifyRequest } request 
   * @param { FastifyReply } reply 
   */
  delteOneTodo: async(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply)=>{
    // Id de la Todo
    const id: string = request.params.id;

    // Suppression
    const todo = await TodoDataAccess.deleteOneTodo(id);
    
    reply.send({todo})
  },

  /**
   * CheckToggle d'une Todo
   * @param { FastifyRequest } request 
   * @param { FastifyReply } reply 
   */
  checkToggleOneTodo: async(request: FastifyRequest<{Params: {id: string}, Body: CheckToggleTodoSchema}>, reply: FastifyReply)=>{
    // id Todo
    const id: string = request.params.id;

    // Status
    const { status } = request.body;

    // CheckToggle
    const todo = await TodoDataAccess.checkToggleOneTodo(id, status);

    reply.send({todo})
  }
}