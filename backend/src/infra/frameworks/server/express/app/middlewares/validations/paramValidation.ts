import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../../../../../../exceptions/ValidationException";

/**
 * Validation de données
 * @param {any} schema - schéma de données a valider
 * @returns 
 */
export default (schema: any)=>async(req: Request, res: Response, next: NextFunction)=>{
  try {
    // Validations des params
    await schema.validateAsync(req.params);     
    
    next();        
  } catch (error: any) {
    throw new ValidationException(error.message)
  }
};