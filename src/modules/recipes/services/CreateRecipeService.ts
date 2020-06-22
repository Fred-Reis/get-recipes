import Recipe from '../infra/entities/Recipe';

import RecipesRepository from '../infra/repositories/RecipesRepository';

import IRecipesRepository from '../repositories/IRecipesRepository';
import ICreateRecipeDTO from '../dtos/ICreateRecipeDTO';

class CreateRecipeService {
  private recipesRepository: IRecipesRepository;

  constructor() {
    this.recipesRepository = new RecipesRepository();
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
