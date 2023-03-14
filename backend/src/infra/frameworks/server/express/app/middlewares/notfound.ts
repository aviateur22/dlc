import { NextFunction, Request, Response } from "express";

/**
 * Path Invalide
 */
export default(req: Request, res: Response, next: NextFunction)=>{
  return res.status(404).json({
    message: 'invalid path'
  });
};