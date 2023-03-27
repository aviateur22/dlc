import express  from "express";
import controllerHandler from "../../../helpers/controllerHandler";
import bodyValidation from '../../../middlewares/validations/bodyValidation';
import sanitizer from "../../../middlewares/sanitizer";
import verifyAuth from "../../../middlewares/verifyAuth";
import userRole from "../../../middlewares/userRole";
import formatCookie from "../../../middlewares/formatCookie";
import acceptRelationSchema from '../../../middlewares/validations/schemas/dlc/relation/acceptRelation';
import refuseRelationSchema from '../../../middlewares/validations/schemas/dlc/relation/refuseRelation';
import relationController from '../../../controllers/dlc/relation'
import verifyCsurfToken from "../../../middlewares/verifyCsurfToken";

const router = express.Router();

// Accepte la relation
router.post('/',
  controllerHandler(sanitizer), 
  controllerHandler(formatCookie),
  controllerHandler(verifyAuth),
  controllerHandler(userRole.user),
  controllerHandler(verifyCsurfToken),
  controllerHandler(bodyValidation(acceptRelationSchema)), 
  controllerHandler(relationController.acceptRelation)
);

// suppression relation
router.delete('/',
  controllerHandler(sanitizer), 
  controllerHandler(formatCookie),
  controllerHandler(verifyAuth),
  controllerHandler(userRole.user),
  controllerHandler(verifyCsurfToken),
  controllerHandler(bodyValidation(refuseRelationSchema)),
  controllerHandler(relationController.refuseRelation)
);

export default router;