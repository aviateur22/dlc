import express  from "express";
import productController from '../../../controllers/dlc/product';
import fileUpload from 'express-fileupload';
import controllerHandler from "../../../helpers/controllerHandler";
import userRole from '../../../middlewares/userRole'; 
import fileValidation from '../../../middlewares/validations/fileValidation';
import bodyValidation from '../../../middlewares/validations/bodyValidation';
import imageSchema from '../../../middlewares/validations/schemas/dlc/product/image';
import addProductSchema from '../../../middlewares/validations/schemas/dlc/product/addProduct';
import sanitizer from "../../../middlewares/sanitizer";
import verifyAuth from "../../../middlewares/verifyAuth";
import formatCookie from "../../../middlewares/formatCookie";
import verifyCsurfToken from "../../../middlewares/verifyCsurfToken";

const router = express.Router();

// Ajout d'un produit
router.post('/',
  controllerHandler(formatCookie),
  controllerHandler(verifyAuth),
  controllerHandler(userRole.user),
  fileUpload(),
  controllerHandler(sanitizer),
  controllerHandler(fileValidation(imageSchema)),
  controllerHandler(bodyValidation(addProductSchema)),
  controllerHandler(verifyCsurfToken),
  controllerHandler(productController.addProduct));

export default router;