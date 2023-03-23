import { NextFunction, Response } from "express";
import messages from "../../../../../../domain/messages/messages";

import { ReqCookie } from "../interfaces/ReqCookie";

export default(req: ReqCookie, res: Response, next: NextFunction)=>{
  /**object pour stocker les cookies */
  const list = {};

  // Pas de header dans la requete
  if(!req.headers){
    return next();
  }

  /** pas de cookie présent dans les headers de la requete */
  if(!req.headers.cookie){
    return next();
  }

  // Récuperation des cookies
  const cookieHeader = req.headers.cookie;  

  // Mise des cookies dans l'objet
  cookieHeader.split(';').forEach(function(cookie) {
    
    if(cookie.includes('=')) {
      let [ name, ...rest] = cookie.split('=');
       
      name = name?.trim();
      if(!name) {
          throw new Error(messages.message.formatCookieError);
      }
      const value = rest.join('=').trim();
      if(!value){
        throw new Error(messages.message.formatCookieError);
      }
      //@ts-ignore
      list[name] = decodeURIComponent(value);
    }
  });  
  req.cookieList = list;   
  next();
};