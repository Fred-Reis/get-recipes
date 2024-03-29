import axios from 'axios';

import AppError from '../../../shared/errors/AppError';

class CreateGifsService {
  public async execute(title: string): Promise<string> {
    const fullTitle = title.split(' ').join('+');

    const response = await axios.get(
      `${process.env.GIPHY_URL}?q=${fullTitle}&api_key=${process.env.API_KEY}&limit=3`,
    );

    if (response.status !== 200) {
      throw new AppError(
        'Sorry, one of our partners may be in trouble now, try again later.',
      );
    }

    let gif;

    for (let count = 0; response.data.length > count; count++) {
      if (response.data[count] !== undefined) {
        gif = response.data[count].url;
      }
    }

    return gif ? gif : 'Sorry, we not found a gif for this recipe.';
  }
}

export default CreateGifsService;
