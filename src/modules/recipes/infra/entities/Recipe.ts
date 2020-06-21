import { uuid } from 'uuidv4';

class Recipe {
  id: string;

  title: string;

  ingredients: string[];

  link: string;

  gif: string;

  created_at: Date;

  constructor({
    title,
    ingredients,
    link,
    gif,
    created_at,
  }: Omit<Recipe, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.ingredients = ingredients;
    this.link = link;
    this.gif = gif;
    this.created_at = created_at;
  }
}

export default Recipe;
