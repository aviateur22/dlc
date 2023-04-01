import { NextFunction, Response } from "express";
import { ReqCookie } from "../interfaces/ReqCookie";
import jsonwebtoken from 'jsonwebtoken'
import { ErrorServerException } from "../../../../../../exceptions/ErrorServerException";
import messages from "../../../../../../domain/messages/messages";

/**
 * Récupération données sur le JWT (ExpiredAt and JWTidentifier)
 */
export default(req: ReqCookie, res: Response, next: NextFunction)=>{
  
  // Recupération des cookies    
  if(!req.cookieList || !req.cookieList.authorization){
    return next();
  }

  // JWT - Name: authorization
  const jwt = req.cookieList.authorization;  
  
  //clé secrete
  const KEY = process.env.JWT_PRIVATE_KEY;  

  if(!KEY){
    throw new ErrorServerException(messages.message.errorServer)
  }
  
  const jwtInfo: any = jsonwebtoken.verify(jwt, KEY);

  req.jwtInformation = {
    expiredAt: jwtInfo.exp,
    JwtIdentifier: jwtInfo.jti
  } 
  next();
 }