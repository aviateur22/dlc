import { NextFunction, Response } from "express";
import { Token } from "../../../../../helpers/security/csurf/Token";
import { ReqCookie } from "../interfaces/ReqCookie";
import { ForbiddenException } from "../../../../../../exceptions/ForbiddenException";
import messages from "../../../../../../domain/messages/messages";

/**
 * Vérification tokenCsurf
 */
export default async(req: ReqCookie, res: Response, next: NextFunction)=>{
  // token 
  const token: string = req.headers.token as string;

  if(!token) {
    throw new ForbiddenException(messages.message.forbiddenAction);
  }

  const jwtToken = req.payload.data.token;
  
  if(!jwtToken) {
    throw new ForbiddenException(messages.message.forbiddenAction);
  }

  await Token.compare(jwtToken, token);
  
  next();
}