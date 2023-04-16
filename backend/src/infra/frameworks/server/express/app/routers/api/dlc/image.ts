import express  from "express";
import controllerHandler from "../../../helpers/controllerHandler";
import imageController from '../../../controllers/dlc/image'
import verifyAuth from "../../../middlewares/verifyAuth";
import userRole from "../../../middlewares/userRole";
import formatCookie from "../../../middlewares/formatCookie";
import paramValidation from "../../../middlewares/validations/paramValidation";
import productImageIdSchema from '../../../middlewares/validations/schemas/dlc/image/imageId'
import verifyCsurfToken from "../../../middlewares/verifyCsurfToken";


const router = express.Router();

// Récupération image d'un produit
router.get('/:imageId',
  controllerHandler(formatCookie),
  controllerHandler(verifyAuth),
  controllerHandler(verifyCsurfToken),
  controllerHandler(userRole.user),
  controllerHandler(paramValidation(productImageIdSchema)), 
  controllerHandler(imageController.findProductImage)
);
export default router;