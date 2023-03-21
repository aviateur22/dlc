import express  from "express";
import userController from '../../../controllers/dlc/user';
import controllerHandler from "../../../helpers/controllerHandler";
import userRole from '../../../middlewares/userRole'; 
import bodyValidation from '../../../middlewares/validations/bodyValidation';
import sanitizer from "../../../middlewares/sanitizer";
import userSchema from "../../../middlewares/validations/schemas/dlc/user/index";

const router = express.Router();

router.post('/login', 
  controllerHandler(bodyValidation(userSchema.loginSchema)), 
  controllerHandler(userController.login)
  );

export default router;
