import { NextFunction, Response } from "express";
import { UserRole } from "../../../../../../domain/helpers/userRole";
import messages from "../../../../../../domain/messages/messages";
import { ForbiddenException } from "../../../../../../exceptions/ForbiddenException";
import { ReqCookie } from "../interfaces/ReqCookie";

const userRole = {
    
  /**
  * Vérification si privilege User
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
   * Verification si privilège Admin
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
    if(!req.payload || !req.payload.data.roleId || req.payload.data.roleId < userRole){
      throw new ForbiddenException(messages.message.forbiddenAction);
    }   
  }
}

export default userRole;
