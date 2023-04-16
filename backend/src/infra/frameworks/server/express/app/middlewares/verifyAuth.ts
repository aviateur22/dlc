import { NextFunction, Response } from "express";
import { ReqCookie } from "../interfaces/ReqCookie";
import { SessionExpiredException } from "../../../../../../exceptions/SessionExpiredException";
import messages from "../../../../../../domain/messages/messages";
import { JwtHandler } from "../../../../../helpers/security/jwt/JwtHandler";

export default(req: ReqCookie, res: Response, next: NextFunction)=>{

  // Recupération des cookies
  if(!req.cookieList || !req.cookieList.authorization){
    throw new SessionExpiredException(messages.message.expiredSession);
  }

  // Récupération JWT
  const jwtToVerify = req.cookieList.authorization; 

  // Vérifcation jwt + récupération payload
  const tokenJwt = new JwtHandler();  
  const payload = tokenJwt.verify(jwtToVerify);

  req.payload = payload;

  return next();
 }