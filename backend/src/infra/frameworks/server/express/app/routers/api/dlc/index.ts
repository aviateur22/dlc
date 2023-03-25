import express from "express";
import product from './product';
import user from './user'
import friend from './friend'
const router = express.Router();

// router user
router.use('/user', user);

// router product
router.use('/product', product);

// router friend
router.use('/friend', friend);

export default router;