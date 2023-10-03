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

// Зміна з дівом, куди записується розмітка модалки
const cocktailsCardInfo = document.querySelector('.cocktails-container');
const backdrop = document.querySelector('body');

// Розмітка для модалки
function renderModalContent(chosenElement) {
  const { _id, drink, glass, instructions, drinkThumb, ingredients } =
    chosenElement;
  return `<div class="cocktails-info">
  <div class="backdrop">
  <div class="modal">
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
        ADD TO fAVORITE
      </button>
      <button class="back-btn" type="button" data-modal-close >BACK</button>
    </div>
  </div>
</div>`;
}

// Фунуція для виклику модалки
export function getCardInfo(event) {
  cocktailsCardInfo.classList.remove('is-hidden');
  const cocktailsId = event.target.getAttribute('data-id');

  getCocktails()
    .then(resp => {
      const chosenElement = resp.find(item => item._id === cocktailsId);

      const modalContent = renderModalContent(chosenElement);
      cocktailsCardInfo.insertAdjacentHTML('beforeend', modalContent);

      document.querySelectorAll('.ingredients-list').forEach(item => {
        item.addEventListener('click', e => {
          if (e.target.nodeName === 'BUTTON') {
            const ingredientId = e.target.dataset.id;

            getIngredients(ingredientId).then(res => {
              currentIngredient = res[0];

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

      // const addFavoriteCocktailsBtn =
      //   document.querySelector('.add-favorite-btn');
      // addFavoriteCocktailsBtn.addEventListener(
      //   'click',
      //   handlerAddFavoriteCocktails
      // );

      // Клік по бекдропу закриває модалку
      // backdrop.addEventListener('click', () => {
      //   cocktailsCardInfo.innerHTML = '';
      //   cocktailsCardInfo.classList.add('is-hidden');
      // });

      // Кнопка, що закриває модалку
      const backBtn = document.querySelectorAll('.back-btn');
      backBtn.forEach(button =>
        button.addEventListener('click', () => {
          cocktailsCardInfo.innerHTML = '';
          cocktailsCardInfo.classList.add('is-hidden');
        })
      );
    })
    .catch(err => console.log(err));
}
