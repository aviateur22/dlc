import express, { Request, Response } from "express";
import todos from "../../controllers/todo";
import controllerHandler from "../../helpers/controllerHandler";
import sanitizer from "../../middlewares/sanitizer";
import bodyValidation from '../../middlewares/validations/bodyValidation';
import paramValidation from '../../middlewares/validations/paramValidation';
import validationTodoSchema from '../../middlewares/validations/schemas'

const router = express.Router();


 // Accueil fonctionnement API 
router.get('/', (req: Request, res: Response)=>{
  res.json({
    message: 'Bienvenue sur l\'API des Todos'
  })
});

// Ajout de 1 Todo
router.post('/',  
  controllerHandler(bodyValidation(validationTodoSchema.addTodoSchema)),
  controllerHandler(sanitizer),
  controllerHandler(todos.addTodo)
);

// Récupération de tous les todos
router.get('/find-all-todos',
  controllerHandler(todos.findAllTodos)
)

// Update d'une Todo
router.patch('/:id',  
  controllerHandler(paramValidation(validationTodoSchema.idParamSchema)),
  controllerHandler(bodyValidation(validationTodoSchema.updateTodoSchema)),  
  controllerHandler(sanitizer),
  controllerHandler(todos.updateTodo)
);

// Recherche de 1 Todo
router.get('/:id', 
  controllerHandler(paramValidation(validationTodoSchema.idParamSchema)),
  controllerHandler(todos.findOneTodo)
);

// Suppression de 1 Todo
router.delete('/:id',
  controllerHandler(paramValidation(validationTodoSchema.idParamSchema)),
  controllerHandler(todos.delteOneTodo)
)

// Check Toggle 1 Todo
router.patch('/toggle-check/:id',
  controllerHandler(paramValidation(validationTodoSchema.idParamSchema)),
  controllerHandler(bodyValidation(validationTodoSchema.checkToggleTodoSchema)),
  controllerHandler(sanitizer),
  controllerHandler(todos.checkToggleOneTodo)
)

export default router;