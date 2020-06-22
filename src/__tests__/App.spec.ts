import axios from 'axios';

import AppError from '../shared/errors/AppError';

import ImportRecipesService from '../modules/recipes/services/ImportRecipesService';
import CreateRecipeService from '../modules/recipes/services/CreateRecipeService';
import CreateGifsService from '../modules/recipes/services/CreateGifsService';

import Recipe from '../modules/recipes/infra/entities/Recipe';

let importRecipes: ImportRecipesService;
let createRecipe: CreateRecipeService;
let createGifs: CreateGifsService;

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  beforeEach(() => {
    createRecipe = new CreateRecipeService();
    importRecipes = new ImportRecipesService();
    createGifs = new CreateGifsService();
  });

  it('should be able to create new recipe', async () => {
    const recipe = await createRecipe.execute({
      title: 'teste',
      ingredients: ['teste', 'teste_1'],
      link: 'teste@teste',
      gif: 'teste@teste.com',
    });

    expect(recipe).toHaveProperty('id');
  });

  it('should be able to create new gif', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: [
        {
          url: 'string',
        },
      ],
    });

    const response = await createGifs.execute('test');

    expect(response).toBe('string');
  });

  it('should not be able to create new gif', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 500,
      data: [
        {
          url: 'string',
        },
      ],
    });

    await expect(createGifs.execute('test')).rejects.toBeInstanceOf(AppError);
  });

  it('should not found gif', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: [{}],
    });

    const response = await createGifs.execute('test');

    expect(response).toBe('Sorry, we not found a gif for this recipe.');
  });

  it('should be able to import new recipes', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        results: [
          {
            title: 'test',
            href: 'teste.com',
            ingredients: 'test',
            thumbnail: 'test.thumb.com',
          },
        ],
      },
    });

    const res = [
      {
        title: 'test',
        ingredients: ['test'],
        link: 'teste.com',
        gif: 'Sorry, we not found a gif for this recipe.',
      },
    ];

    const response = await importRecipes.execute('test');

    expect(response).toEqual(res);
  });

  it('should not be able to import new recipes ', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 500,
      data: {
        results: [
          {
            title: 'test',
            href: 'teste.com',
            ingredients: 'test',
            thumbnail: 'test.thumb.com',
          },
        ],
      },
    });

    await expect(importRecipes.execute('test')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to import new recipes with nothing params', async () => {
    await expect(importRecipes.execute('')).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to import new recipes with more of three params', async () => {
    await expect(
      importRecipes.execute('test,test1,test2,test3'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not found new recipes ', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        results: [],
      },
    });

    await expect(importRecipes.execute('test')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
