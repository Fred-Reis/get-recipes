import { Router } from 'express';

import ImportRecipesService from '../services/ImportRecipesService';

const recipeRouter = Router();

/**
 * Pendências
 * separar variaveis ambiente; ok
 * Docker deploy;
 * Readme;
 * DDD;
 * Test
 */

recipeRouter.get('/', async (request, response) => {
  const { i } = request.query;

  const importRecipesService = new ImportRecipesService();

  const fullRecipes = await importRecipesService.execute(i as string);

  const newRecipes = {
    keywords: (i as string).split(',').sort(),
    recipes: fullRecipes,
  };

  return response.json(newRecipes);
});

export default recipeRouter;
