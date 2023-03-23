import { NextFunction, Response } from "express";
import { Token } from "../../../../../helpers/security/csurf/Token";
import { ReqCookie } from "../interfaces/ReqCookie";

/**
 * Vérification tokenCsurf
 */
export default async(req: ReqCookie, res: Response, next: NextFunction)=>{
  const { token } = req.body;
  const cookieToken = req.payload.data.token;
  
  await Token.compare(cookieToken, token)
  next();
}