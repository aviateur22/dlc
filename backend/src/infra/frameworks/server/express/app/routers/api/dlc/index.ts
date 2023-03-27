import express from "express";
import product from './product';
import user from './user';
import friend from './friend';
import relation from './relation';


const router = express.Router();

// Router user
router.use('/user', user);

// Router product
router.use('/product', product);

// Router friend
router.use('/friend', friend);

// Router Relation
router.use('/relation', relation);

export default router;