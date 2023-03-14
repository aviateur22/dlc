import express , { NextFunction, Request, Response } from "express";
import api from './api';
import routerTest from "./api/routerTest";

const router = express.Router();

// Home backend Todos
router.get('/', (req: Request, res: Response, next: NextFunction)=>{
  res.json({
    message: 'Welcome on the todo list project'
  })
});

// Api Todo
router.use('/api/v1', api);

// Router Test unitaire
router.use(routerTest);

export default router