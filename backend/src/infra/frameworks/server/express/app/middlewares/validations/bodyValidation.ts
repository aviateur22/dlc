import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../../../../../../exceptions/ValidationException";

/**
 * Validation de données
 * @param {any} schema - schéma de données a valider
 * @returns 
 */
export default (schema: any)=>async(req: Request, res: Response, next: NextFunction)=>{
  try {
   
    if(req.method.toLowerCase() ==='get'){
        await schema.validateAsync(req.query);          
    } else {
        await schema.validateAsync(req.body);
    }
      next();        
  } catch (error: any) {
    throw new ValidationException(error.message)
  }
};