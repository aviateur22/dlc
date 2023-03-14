import { NextFunction, Request, Response } from "express";

/**
 * Wrapper pour les controller
 */
export default(controller: any)=>async(req: Request, res: Response, next: NextFunction)=>{
  try {
      await controller(req, res, next);        
  } catch (error) {
      return next(error);
  }
};