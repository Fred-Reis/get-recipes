import Recipe from '../entities/Recipe';

import ICreateRecipeDTO from '../../dtos/ICreateRecipeDTO';
import IRecipesRepository from '../../repositories/IRecipesRepository';

class RecipesRepository implements IRecipesRepository {
  private recipes: Recipe[];

  constructor() {
    this.recipes = [];
  }

  public all(): Recipe[] {
    return this.recipes;
  }

  public async create({
    title,
    link,
    ingredients,
    gif,
  }: ICreateRecipeDTO): Promise<Recipe> {
    const recipe = new Recipe({
      title,
      ingredients,
      link,
      gif,
      created_at: new Date(),
    });

    this.recipes.push(recipe);

    return recipe;
  }
}

export default RecipesRepository;
