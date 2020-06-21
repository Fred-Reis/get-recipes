import Recipe from '@modules/recipes/infra/entities/Recipe';
import ICreateRecipeDTO from '@modules/recipes/dtos/ICreateRecipeDTO';

export default interface IRecipesRepository {
  create(data: ICreateRecipeDTO): Promise<Recipe>;
}
