import { Request, Response, NextFunction } from "express";

export default {
  register: async(request: Request, response: Response, next: NextFunction)=>{
    console.log('controller register')
    response.status(201).json({
      message: 'Bonjour'
    });
  }
}