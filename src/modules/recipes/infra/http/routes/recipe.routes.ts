import { Router } from 'express';

import RecipesController from '../controllers/RecipesController';

const recipeRouter = Router();
const recipesController = new RecipesController();

recipeRouter.get('/', recipesController.create);

export default recipeRouter;
