import express  from "express";
import controllerHandler from "../../../helpers/controllerHandler";
import friendController from '../../../controllers/dlc/friend'
import bodyValidation from '../../../middlewares/validations/bodyValidation';
import sanitizer from "../../../middlewares/sanitizer";
import verifyAuth from "../../../middlewares/verifyAuth";
import userRole from "../../../middlewares/userRole";
import friendValidation from '../../../middlewares/validations/schemas/dlc/friend'
import formatCookie from "../../../middlewares/formatCookie";

const router = express.Router();

router.post('/',
  controllerHandler(sanitizer), 
  controllerHandler(formatCookie),
  controllerHandler(verifyAuth),
  controllerHandler(userRole.user),
  controllerHandler(bodyValidation(friendValidation.addFriendSchema)), 
  controllerHandler(friendController.addFriendRelation)
);

router.delete('/',
  controllerHandler(bodyValidation(friendValidation.deleteFriendSchema)),
  controllerHandler(friendController.deleteFriendRelation)
);

export default router;
