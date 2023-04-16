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
import paramValidation from "../../../middlewares/validations/paramValidation";
import userId from "../../../middlewares/validations/schemas/dlc/relation/userId";

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

router.get('/find-new-relation/:userId',
  controllerHandler(sanitizer), 
  controllerHandler(formatCookie),
  controllerHandler(verifyAuth),
  controllerHandler(userRole.user),
  controllerHandler(verifyCsurfToken),
  controllerHandler(paramValidation(userId)),
  controllerHandler(relationController.findNewRelation)

)

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