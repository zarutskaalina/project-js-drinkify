import axios from 'axios';

import { createMarkupCocktail } from './create-markup-cocktail';
import { getCardInfo } from './cocktails-modal';

const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const cocktailsListEl = document.querySelector(
  '.random-cocktails .cocktails-list'
);

const innerWidth = document.body.clientWidth;
const emptySearchContainer = document.querySelector('.empty-search');
const randomCocktailsContainer = document.querySelector('.random-cocktails');

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
    emptySearchContainer.classList.remove('isHidden');
    randomCocktailsContainer.classList.add('isHidden');
  }
}

export function renderCocktails(arr, container) {
  const markup = arr.map(item => createMarkupCocktail(item)).join('');
  container.innerHTML = markup;
  const learnMoreBtns = document.querySelectorAll('.cocktails-button');
  learnMoreBtns.forEach(button => {
    button.addEventListener('click', getCardInfo);
  });
  const favBtn = document.querySelectorAll('.cocktails-button-favorite');
  favBtn.forEach(bfv => {
    bfv.addEventListener('click', e=>handleAddToFavorite(e,'cocktails'));
  });
}

fetchRandomCocktails(numberOfRandomCocktails(innerWidth)).then(res =>
  renderCocktails(res, cocktailsListEl)
);

