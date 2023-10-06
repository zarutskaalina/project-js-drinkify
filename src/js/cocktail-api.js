import axios from 'axios';

export const base_url = 'https://drinkify.b.goit.study/api/v1';

axios.defaults.baseURL = base_url;

export const getCocktails = async () => {
  try {
    const { data } = await axios(`/cocktails/lookup/`);
    return data;
  } catch (error) {
    throw new Error('Something goes wrong!');
  }
};
