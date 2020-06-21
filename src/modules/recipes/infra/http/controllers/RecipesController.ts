import { Request, Response } from 'express';

import ImportRecipesService from '@modules/recipes/services/ImportRecipesService';

export default class RecipesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { i } = request.query;

    const importRecipesService = new ImportRecipesService();

    const createdRecipes = await importRecipesService.execute(i as string);

    const recipes = {
      keywords: (i as string).split(',').sort(),
      recipes: createdRecipes,
    };

    return response.json(recipes);
  }
}
