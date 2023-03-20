import express from "express";
import dlc from './dlc'

const router = express.Router();

// router Todos
router.use('/dlc', dlc);

export default router;