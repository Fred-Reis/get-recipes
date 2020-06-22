import axios from 'axios';

import CreateRecipeService from './CreateRecipeService';
import CreateGifsService from './CreateGifsService';
import Recipe from '../infra/entities/Recipe';

import AppError from '../../../shared/errors/AppError';

const createRecipeService = new CreateRecipeService();
const createGifsService = new CreateGifsService();

class ImportRecipesService {
  private recipies: Recipe[];

  constructor() {
    this.recipies = [];
  }

  public async execute(ingredients: string): Promise<Recipe[]> {
    if (!ingredients) {
      throw new AppError('Choose at least one ingredient.');
    }

    if (ingredients.split(',').length > 3) {
      throw new AppError('Choose a maximum of three ingredients.');
    }

    const response = await axios.get(
      `${process.env.PUPPY_URL}?i=${ingredients}`,
    );

    if (response.status !== 200) {
      throw new AppError(
        'Sorry, one of our partners may be in trouble now, try again later.',
      );
    }

    if (response.data.results.length < 1) {
      throw new AppError('Sorry, no recipes were found for these ingredients.');
    }

    for (const result of response.data.results) {
      const gif = await createGifsService.execute(result.title);
      const recipe = await createRecipeService.execute({
        title: result.title,
        ingredients: result.ingredients.split(',').sort(),
        gif,
        link: result.href,
      });

      delete recipe.id;
      delete recipe.created_at;

      this.recipies.push(recipe);
    }

    return this.recipies;
  }
}

export default ImportRecipesService;
