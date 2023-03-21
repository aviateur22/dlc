import { NextFunction, Response } from "express";
import { UserRole } from "../../../../../../domain/helpers/userRole";
import { ReqCookie } from "../interfaces/ReqCookie";

const userRole = {
    
  /**
  * 
  * @param {ReqCookie} req 
  * @param {Response} res 
  * @param {NextFunction} next 
  * @returns {void}
  */
  user: (req: ReqCookie, res: Response, next: NextFunction): void => {
    userRole.controllCookies(req, UserRole.user);
    return next();    
  },
    
  /**
   * 
   * @param {ReqCookie} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {void}
   */
  admin: (req: ReqCookie, res: Response, next: NextFunction): void =>{
    userRole.controllCookies(req, UserRole.admin);
    return next();
  },

  /**
   * Vérification userRole
   * @param {ReqCookie} req 
   * @param {UserRole} userRole 
   */
  controllCookies:(req: ReqCookie, userRole: number) => {
    /** Pas de données en provenance du JWT */
    if(!req.payload){
      throw ({ message: 'données manquant pour confirmer les privilèges', statusCode:'400' });
    }

    /** Pas de données sur le role utilisateur */
    if(!req.payload.data.role){
      throw ({ message: 'données manquant pour confirmer les privilèges', statusCode:'400' });
    }

    if(req.payload.data.role < userRole){
      throw ({message: 'vous n\'êtes pas autorisé a executer cette action', statusCode:'403'});
    }

    console.log("ii")
  }
}

export default userRole;
