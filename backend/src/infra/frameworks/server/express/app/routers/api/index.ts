import express from "express";
import todo from './todo'
const router = express.Router();

// router Todos
router.use('/todo', todo);

export default router;