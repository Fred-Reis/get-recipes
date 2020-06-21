import { Router } from 'express';
import recipeRouter from './recipe.routes';

const routes = Router();

routes.use('/recipes', recipeRouter);

export default routes;
