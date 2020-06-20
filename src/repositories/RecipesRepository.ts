import Recipe from '../entities/Recipe';

interface CreateRecipeDTO {
  title: string;
  ingredients: string[];
  link: string;
  gif: string;
}

class RecipesRepository {
  private recipes: Recipe[];

  constructor() {
    this.recipes = [];
  }

  public all(): Recipe[] {
    return this.recipes;
  }

  public create({ title, link, ingredients, gif }: CreateRecipeDTO): Recipe {
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
