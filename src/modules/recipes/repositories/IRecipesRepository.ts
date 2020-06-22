import Recipe from '../infra/entities/Recipe';
import ICreateRecipeDTO from '../dtos/ICreateRecipeDTO';

export default interface IRecipesRepository {
  create(data: ICreateRecipeDTO): Promise<Recipe>;
}
