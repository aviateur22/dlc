import express from "express";
import cors from 'cors';
import router from './routers';
import error from './middlewares/error';
import notFound from './middlewares/notfound';
import corsOptions from './helpers/corsOptions';


const app = express();
// Cors
app.use(cors(corsOptions()));

//Permet de gerer les formulaire (pas les formData)
app.use(express.urlencoded({ extended: true }));

//parse en format json
app.use(express.json());

// Routes de l'application Todo
app.use(router);

// Route 404
app.use(notFound);

// Route 500
app.use(error);

export default app;