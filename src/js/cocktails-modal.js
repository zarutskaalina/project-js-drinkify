// import axios from 'axios';
import { getCocktails } from './cocktail-api';
import { Notify } from 'notiflix';
import { renderCocktails } from './get-random-cocktails';
import { createMarkupCocktail } from './create-markup-cocktail';
import { fetchRandomCocktails } from './get-random-cocktails';
import { getIngredients } from './services';
import {
  setFavoriteButtonContent,
  modalContent as modalIngredientContent,
  handleAddToFavorite,
} from './ingredient-modal';
import refs from './refs';

let cocktails = [];
getCocktails().then(data => {
  cocktails = data;
});

// Зміна з дівом, куди записується розмітка модалки
const cocktailsCardInfo = document.querySelector('.cocktails-container');

// Розмітка для модалки
function renderModalContent(chosenElement) {
  const { _id, drink, glass, instructions, drinkThumb, ingredients } =
    chosenElement;
  return `<div class="cocktails-modal-backdrop">
  <div class="cocktails-modal">
  <div class="cocktails-modal-content">
    <img
      src="${drinkThumb}"
      alt="${glass}"
      class="cocktails-img"
      width="288"
    />
    <div class="cocktails-desc">
      <h3 class="cocktails-title">${drink}<b></b></h3>
      <h3 class="cocktails-ingredients-title"><b>INGREDIENTS:</b></h3>
      <ul class="ingredients-list">
        ${ingredients
          .map(
            ({ measure, title, ingredientId }) =>
              `<li>
                <button type="button" class="ingredient-element" data-id="${ingredientId}">
                 ${title}
                </button>
            </li>`
          )
          .join('')}
      </ul>
    </div>
  </div>

    <h3 class="cocktails-instructions-title"><b>INSTRUCTIONS:</b></h3>
    <p class="cocktails-instructions">${instructions}</p>

    <div class="cocktails-btn">
      <button class="add-favorite-btn" type="button" data-id="${_id}">
        ADD TO FAVORITE
      </button>
      <button class="back-btn" type="button" data-modal-close >BACK</button>
    </div>
  </div>
</div>`;
}

let modalBtn = {};

// Фунуція для виклику модалки
export function getCardInfo(event) {
  cocktailsCardInfo.classList.remove('is-hidden');
  const cocktailsId = event.target.getAttribute('data-id');
  const chosenElement = cocktails.find(item => item._id === cocktailsId);
  const modalContent = renderModalContent(chosenElement);
  cocktailsCardInfo.insertAdjacentHTML('beforeend', modalContent);

  modalBtn = {
    backdrop: document.querySelector('.cocktails-modal-backdrop'),
    cocktailsModal: document.querySelector('.cocktails-modal'),
    cocktailModaFavoriteBtn: document.querySelector('.add-favorite-btn'),
    backBtn: document.querySelectorAll('.back-btn'),
  };

  modalBtn.cocktailModaFavoriteBtn.addEventListener(
    'click',
    handlerAddToFavotiteCocktail
  );

  document.querySelectorAll('.ingredients-list').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.nodeName === 'BUTTON') {
        const ingredientId = e.target.dataset.id;

        getIngredients(ingredientId).then(res => {
          currentIngredient = res[0];
          console.log(res[0]);

          const modalContentMarkup = modalIngredientContent(res[0]);
          refs.ingredientModaContent.insertAdjacentHTML(
            'beforeend',
            modalContentMarkup
          );
          localStorage.setItem(
            'currentIngredient',
            JSON.stringify(currentIngredient)
          );
          refs.backdrop.classList.add('isShow');
          refs.ingredientModal.classList.add('isShow');
          setFavoriteButtonContent(ingredientId);
          refs.ingredientModaFavoriteButton.addEventListener(
            'click',
            handleAddToFavorite
          );
        });
      }
    });
  });

  // Кнопка, що закриває модалку
  modalBtn.backBtn.forEach(button =>
    button.addEventListener('click', () => {
      cocktailsCardInfo.innerHTML = '';
      cocktailsCardInfo.classList.add('is-hidden');
    })
  );
}

const handlerAddToFavotiteCocktail = e => {
  const ADD_TO_FAVORITE = 'ADD TO FAVORITE';
  const REMOVE_FROM_FAVORITE = 'REMOVE FROM FAVORITE';
  const id = e.target.getAttribute('data-id');
  const chosenCocktail = cocktails.find(item => item._id === id);
  const favoriteCocktails =
    JSON.parse(localStorage.getItem('favoriteCocktails')) || [];
  if (e.target.innerText === ADD_TO_FAVORITE) {
    localStorage.setItem(
      'favoriteCocktails',
      JSON.stringify([...favoriteCocktails, chosenCocktail])
    );
    modalBtn.cocktailModaFavoriteBtn.textContent = REMOVE_FROM_FAVORITE;
  } else {
    const filteredArr = favoriteCocktails.filter(item => item._id !== id);
    localStorage.setItem('favoriteCocktails', JSON.stringify(filteredArr));
    modalBtn.cocktailModaFavoriteBtn.textContent = ADD_TO_FAVORITE;
  }
};
