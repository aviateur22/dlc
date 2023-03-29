import express  from "express";
import controllerHandler from "../../../helpers/controllerHandler";
import imageController from '../../../controllers/dlc/image'
import verifyAuth from "../../../middlewares/verifyAuth";
import userRole from "../../../middlewares/userRole";
import formatCookie from "../../../middlewares/formatCookie";
import paramValidation from "../../../middlewares/validations/paramValidation";
import productImageIdSchema from '../../../middlewares/validations/schemas/dlc/image/imageId'


const router = express.Router();

// Accepte la relation
router.get('/:imageId',
  controllerHandler(formatCookie),
  controllerHandler(verifyAuth),
  controllerHandler(userRole.user),
  controllerHandler(paramValidation(productImageIdSchema)), 
  controllerHandler(imageController.findProductImage)
);
export default router;