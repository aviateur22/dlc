import { NextFunction, Request, Response } from "express";
import { TodoDataAccess } from "../../../../../helpers/dataAccess/TodoDataAccess";


export default {

  /**
   * Récupération des todos
   * @param { Request } req 
   * @param { Response } res 
   * @param { NextFunction } next 
   */
  findAllTodos: async(req: Request, res: Response, next: NextFunction)=>{
    // Récupération des Todos
    const todos = await TodoDataAccess.findAllTodos();

    res.json({
      todos
    })
  },

  /**
   * Ajout d'une Todo
   * @param { Request } req 
   * @param { Response } res 
   * @param { NextFunction } next
   */
  addTodo: async(req: Request, res: Response, next: NextFunction) => {

    let { title, description } = req.body;

    // Ajout de la Todo
    const todo = await TodoDataAccess.addTodo(title, description);    
    res.status(201).json({
      todo
    })
  },

  /**
   * Update d'une Todo
   * @param { Request } req 
   * @param { Response } res 
   * @param { NextFunction } next 
   */
  updateTodo: async(req: Request, res: Response, next: NextFunction)=>{
    // Id de la Todo
    const id = req.params.id;

    // Contenu de la Todo
    const { title, description, status } = req.body;

    console.log(status);
    console.log('ici')
    console.log(status);
    // Mise a jour de la Todo
    const todo = await TodoDataAccess.updateTodo(id, title, description, status);

    res.status(200).json({
      todo
    })
  },

  /**
   * Recherche d'une Todo
   * @param { Request } req 
   * @param { Response } res 
   * @param { NextFunction } next 
   */
  findOneTodo: async(req: Request, res: Response, next: NextFunction)=>{
    // Id de la Todo
    const id: string = req.params.id;

    const todo = await TodoDataAccess.findOneTodo(id);

    res.json({
      todo
    })
  },

  /**
   * Suppression d'une Todo
   * @param { Request } req 
   * @param { Response } res 
   * @param { NextFunction } next 
   */
  delteOneTodo: async(req: Request, res: Response, next: NextFunction)=>{
    // Id de la Todo
    const id: string = req.params.id;

    // Suppression
    const todo = await TodoDataAccess.deleteOneTodo(id);
    
    res.json({
      todo
    })
  },

  /**
   * CheckToggle d'une Todo
   * @param { Request } req 
   * @param { Response } res 
   * @param { NextFunction } next 
   */
  checkToggleOneTodo: async(req: Request, res: Response, next: NextFunction)=>{
    // id Todo
    const id: string = req.params.id;

    // Status
    const { status } = req.body;

    // CheckToggle
    const todo = await TodoDataAccess.checkToggleOneTodo(id, status);

    res.json({
      todo
    })
  }
}