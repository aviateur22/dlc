import { NextFunction, Response } from "express";
import { ReqCookie } from "../interfaces/ReqCookie";
import jsonwebtoken from 'jsonwebtoken'
import { ForbiddenException } from "../../../../../../exceptions/ForbiddenException";

export default(req: ReqCookie, res: Response, next: NextFunction)=>{
   
  /**Recupération des cookies */    
  if(!req.cookieList){
    throw new ForbiddenException('');
  }    
  
  /** récupération cookie authorization */
  if(!req.cookieList.authorization){
      throw ({message: 'pas de token d\'identification', statusCode:'401'});
  }

  /** récupération cookie authorization */
  const authorizationToken = req.cookieList.authorization;  
  
  //clé secrete
  const KEY = process.env.JWT_PRIVATE_KEY;

  if(!KEY){
      throw ({message: 'KEY token absente', statusCode:'500'});
  }

  jsonwebtoken.verify(authorizationToken, KEY, function(err: any, payload: any) {        
      if(err){
          throw ({message: 'votre session a expirée', statusCode:'401'});
      }
      req.payload = payload;
      return next();
  });
 
  next();
 }