import axios from 'axios';
import { createMarkupCocktail } from './createMarkupCocktail';
import { getCardInfo } from './overlay-cocktails-learm-more';

const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const cocktailsListEl = document.querySelector(
  '.random-cocktails .cocktails-list'
);

const innerWidth = document.body.clientWidth;

const numberOfRandomCocktails = innerWidth => {
  let amount = 8;
  if (innerWidth > 1279) {
    amount = 9;
  }
  console.log(innerWidth, amount);
  return amount;
};

export async function fetchRandomCocktails(numberOfRandomCocktails) {
  try {
    const finalUrl = BASE_URL + 'cocktails';
    console.log(finalUrl);
    const response = await axios.get(finalUrl, {
      params: {
        r: numberOfRandomCocktails,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function renderCocktails(arr, container) {
  const markup = arr.map(item => createMarkupCocktail(item)).join('');
  container.innerHTML = markup;
  const learnMoreBtns = document.querySelectorAll('.cocktails-button');
  learnMoreBtns.forEach(button => {
    button.addEventListener('click', getCardInfo);
  });
}

fetchRandomCocktails(numberOfRandomCocktails(innerWidth)).then(res =>
  renderCocktails(res, cocktailsListEl)
);
