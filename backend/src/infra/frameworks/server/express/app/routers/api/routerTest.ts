import express, { NextFunction, Request, Response } from "express";
import { ErrorTestException } from "../../../../../../../exceptions/ErrorTestException";
import multer from 'multer';
import controllerHandler from "../../helpers/controllerHandler";
import validation from '../../middlewares/validations/bodyValidation';
import schemaTest from '../../middlewares/validations/schemas/schemaTest'

const router = express.Router();
const multerEngine = multer().none()

  /**
   * Erreur
   */
  router.get('/test-error', 
    controllerHandler((
      req: Request, res: Response, next: NextFunction)=>{
        throw new Error('Error Test')
      }
    )); 


  /**
   * Erreur managé
   */
  router.get('/test-error-managed', 
  controllerHandler((req: Request, res: Response, next:  NextFunction)=>{
    throw new ErrorTestException('managed error')
  }));


  /**
   * Test validation de données
   */
  router.post('/test-email',
    multerEngine,
    controllerHandler(validation(schemaTest)), 
    controllerHandler((req: Request, res: Response, next:  NextFunction)=>{
      res.json ({
        message: 'done'
      });
    }));

export default router;