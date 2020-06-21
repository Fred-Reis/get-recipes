import RecipesRepository from '@modules/recipes/infra/repositories/RecipesRepository';
import Recipe from '@modules/recipes/infra/entities/Recipe';

import ICreateRecipeDTO from '../dtos/ICreateRecipeDTO';

class CreateRecipeService {
  private recipesRepository: RecipesRepository;

  constructor(recipesRepository: RecipesRepository) {
    this.recipesRepository = recipesRepository;
  }

  public async execute({
    title,
    ingredients,
    link,
    gif,
  }: ICreateRecipeDTO): Promise<Recipe> {
    const recipe = await this.recipesRepository.create({
      title,
      ingredients,
      link,
      gif,
    });

    return recipe;
  }
}

export default CreateRecipeService;
