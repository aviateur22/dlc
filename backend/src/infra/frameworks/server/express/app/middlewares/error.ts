import { NextFunction, Request, Response } from "express";
import { ActionNotAllowedException } from "../../../../../../exceptions/ActionNotAllowedException";
import { EmailFindException } from "../../../../../../exceptions/EmailFindException";
import { ErrorDatabaseException } from "../../../../../../exceptions/ErrorDatabaseException";
import { ErrorTestException } from "../../../../../../exceptions/ErrorTestException";
import { ForbiddenException } from "../../../../../../exceptions/ForbiddenException";
import { FriendRelationException } from "../../../../../../exceptions/FriendRelationException";
import { ImageSizeException } from "../../../../../../exceptions/ImageSizeException";
import { LoggerException } from "../../../../../../exceptions/LoggerException";
import { LoginUserException } from "../../../../../../exceptions/LoginUserException";
import { RepositoryException } from "../../../../../../exceptions/RepositoryException";
import { TodoNotFindException } from "../../../../../../exceptions/TodoNotFindException";
import { UserNotFindException } from "../../../../../../exceptions/UserNotFindException";
import { ValidationException } from "../../../../../../exceptions/ValidationException";
import { LoggerServiceImpl } from "../../../../../services/logger/LoggerServiceImpl";

/**
 * Gestion des erreurs
 */
export default(err: any, req: Request, res: Response, next: NextFunction)=>{
    // Logger 
    const logger = LoggerServiceImpl.getLogger();

    try {
        // Enregistre le message
        logger.logMessage(err.message);

        switch(err.constructor) {
        case ValidationException:
        case TodoNotFindException:
        case ImageSizeException:
        case LoginUserException:
        case ErrorTestException:
        case EmailFindException:
        case UserNotFindException:
        case FriendRelationException:
            return res.status(400).json({
                errorMessage: err.message
            }); 
        break;

        case ForbiddenException:
        case ActionNotAllowedException:
            return res.status(401).json({
                errorMessage: err.message
            }); 
        
        case LoggerException:
        case RepositoryException:
        case ErrorDatabaseException:
            return res.status(500).json({
                errorMessage: err.message
            });
        break;       
        case Error: 
            return res.status(500).json({
                errorMessage: 'server error'
            }); 
        break;
        default: 
            return res.status(500).json({
                errorMessage: 'server error'
            }); 
        break
        }
    } catch (error) {

        // Enregistre le message
        logger.logMessage(err.message);

        /**erreur non managé */
        return res.status(500).json({
            errorMessage: 'server error'
        });        
    }    
};