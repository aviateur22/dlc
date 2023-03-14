import { NextFunction, Request, Response } from "express";
import xss from 'xss';
import sanitizer from 'sanitizer'

/**
 * Sanitizer
 */
export default(req: Request, res: Response, next: NextFunction)=>{
  /**nettoyage des données params / body / query */
  let sanitizeDataBody: any = {};
  let sanitizeDataQuery: any = {};
  let sanitizeDataParams: any = {};

  for(let key in req.query){
    let queryDataString: string|undefined = req.query[key]?.toString();

    if(typeof queryDataString === 'undefined') {
        sanitizeDataQuery[key] = queryDataString;  
    } else {
        sanitizeDataQuery[key] = sanitizeData(typeof req.query[key], queryDataString)    
    }     
  }        

  for( let key in req.body){
    sanitizeDataBody[key] = sanitizeData(typeof req.body[key], req.body[key]);
  }        

  for( let key in req.params){       
      sanitizeDataParams[key] = sanitizeData(typeof req.params[key], req.params[key]);
  }      
  
  /**
   * Traitement des données
   * @param {string} dataType
   * @param {string} dataToSanitize
   */
  function sanitizeData(dataType: string, dataToSanitize: string) {
    switch(dataType) {
    case 'string': case 'number':
        return xss(sanitizer.escape(dataToSanitize).trim());
    break;
    default:
        return xss(sanitizer.escape(dataToSanitize));
    break;
    }      
  }

  /** mise à jour des données nettoyés*/
  req.body = sanitizeDataBody;
  req.query = sanitizeDataQuery;
  req.params = sanitizeDataParams;

  next();
 }