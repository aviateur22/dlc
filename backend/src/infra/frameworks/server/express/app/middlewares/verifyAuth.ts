import { NextFunction, Response } from "express";
import { ReqCookie } from "../interfaces/ReqCookie";
import jsonwebtoken from 'jsonwebtoken'
import { ForbiddenException } from "../../../../../../exceptions/ForbiddenException";
import { ErrorServerException } from "../../../../../../exceptions/ErrorServerException";
import messages from "../../../../../../domain/messages/messages";

export default(req: ReqCookie, res: Response, next: NextFunction)=>{

  /**Recupération des cookies */    
  if(!req.cookieList || !req.cookieList.authorization){
    throw new ForbiddenException(messages.message.forbiddenAction);
  }

  /** récupération cookie authorization */
  const authorizationToken = req.cookieList.authorization;  
  
  //clé secrete
  const KEY = process.env.JWT_PRIVATE_KEY;  

  if(!KEY){
    throw new ErrorServerException(messages.message.errorServer)
  }

  jsonwebtoken.verify(authorizationToken, KEY, function(err: any, payload: any) {        
    if(err){
      throw new ForbiddenException(messages.message.expiredSession);
    }
    
    req.payload = payload;
    return next();
  });
 }