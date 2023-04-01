import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../../../../../../exceptions/ValidationException";

/**
 * Validation de données
 * @param {any} schema - schéma de données a valider
 * @returns 
 */
export default (schema: any)=>async(req: Request, res: Response, next: NextFunction)=>{
  try {    
    
    await schema.validateAsync(req.files); 
   
    next();        
  } catch (error: any) {
    throw new ValidationException(error.message)
  }
};