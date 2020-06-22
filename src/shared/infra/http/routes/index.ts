import { Router } from 'express';
import recipeRouter from '../../../../modules/recipes/infra/http/routes/recipe.routes';

const routes = Router();

routes.use('/recipes', recipeRouter);

export default routes;
