import express from "express";
import product from './product';
import user from './user'

const router = express.Router();

// router Todos
router.use('/user', user);
router.use('/product', product);

export default router;