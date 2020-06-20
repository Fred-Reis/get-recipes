import RecipesRepository from '../repositories/RecipesRepository';
import Recipe from '../entities/Recipe';

interface Request {
  title: string;
  ingredients: string[];
  link: string;
  gif: string;
}

class CreateRecipeService {
  private recipesRepository: RecipesRepository;

  constructor(recipesRepository: RecipesRepository) {
    this.recipesRepository = recipesRepository;
  }

  public execute({ title, ingredients, link, gif }: Request): Recipe {
    const recipe = this.recipesRepository.create({
      title,
      ingredients,
      link,
      gif,
    });

    return recipe;
  }
}

export default CreateRecipeService;
