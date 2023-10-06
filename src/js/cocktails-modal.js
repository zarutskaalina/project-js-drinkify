import { getCocktails } from './cocktail-api';
import { favoriteHandler, markAsFavorite } from './favorite';
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
  console.log(data);
});

const ADD_TO_FAVORITE = 'ADD TO FAVORITE';
const REMOVE_FROM_FAVORITE = 'REMOVE FROM FAVORITE';

console.log(cocktails);

const modal = {
  backdrop: document.querySelector('.cocktails-modal-backdrop'),
  cocktailsModal: document.querySelector('.cocktails-modal'),
  cocktailsModalContent: document.querySelector('.cocktails-modal-content'),
  modalCloseBtn: document.querySelector('.modal-close-btn'),
};

// Розмітка для модалки
function renderModalContent(chosenElement) {
  const { _id, drink, glass, instructions, drinkThumb, ingredients } =
    chosenElement;
  const favoriteCocktails =
    JSON.parse(localStorage.getItem('favoriteCocktails')) || [];
  const isCocktailInStorage =
    favoriteCocktails.findIndex(item => item._id === _id) !== -1;
  const btnText = !isCocktailInStorage ? ADD_TO_FAVORITE : REMOVE_FROM_FAVORITE;
  return `<div class="cocktails-info">
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
        ({ title, ingredientId }) => `
    <li>
      <button
        type="button"
        class="ingredient-element"
        data-id="${ingredientId}"
      >
        ${title}
      </button>
    </li>
    `
      )
      .join('')}
  </ul>
</div>
</div>

<h3 class="cocktails-instructions-title"><b>INSTRUCTIONS:</b></h3>
<p class="cocktails-instructions">${instructions}</p>
<div class="cocktails-btn">
    <button class="cocktail-add-favorite-btn" type="button">
      ${btnText}
    </button>
    <button class="cocktail-back-btn" type="button" data-modal-close>
      BACK
    </button>
  </div>`;
}

// Фунуція для виклику модалки
export function getCardInfo(event) {
  // З'являється модалка
  modal.backdrop.classList.remove('is-hidden');
  modal.cocktailsModal.classList.remove('is-hidden');

  // У ній відбувається рендер карток
  const cocktailsId = event.target.getAttribute('data-id');
  const chosenElement = cocktails.find(item => item._id === cocktailsId);
  const modalContent = renderModalContent(chosenElement);
  modal.cocktailsModalContent.insertAdjacentHTML('beforeend', modalContent);

  const cocktailsModaFavoriteBtn = document.querySelector(
    '.cocktail-add-favorite-btn'
  );
  cocktailsModaFavoriteBtn.setAttribute('data-id', cocktailsId);
  const backBtn = document.querySelectorAll('.cocktail-back-btn');

  //Закриття модалки при кліку на бекдроп
  modal.backdrop.addEventListener('click', () => {
    modal.cocktailsModalContent.innerHTML = '';
    modal.backdrop.classList.add('is-hidden');
    modal.cocktailsModal.classList.add('is-hidden');
  });

  const favouriteSvg = event.target.parentElement.querySelector(
    '.cocktails-button-favorite'
  );
  cocktailsModaFavoriteBtn.addEventListener('click', event =>
    handlerAddToFavotiteCocktail(event, favouriteSvg)
  );

  document.querySelectorAll('.ingredients-list').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.nodeName === 'BUTTON') {
        const ingredientId = e.target.dataset.id;

        getIngredients(ingredientId).then(res => {
          const currentIngredient = res[0];
          const modalContentMarkup = modalIngredientContent(res[0]);
          refs.ingredientModalContent.insertAdjacentHTML(
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
          refs.ingredientModalFavoriteButton.addEventListener(
            'click',
            handleAddToFavorite
          );
        });
      }
    });
  });

  // Закриття модалки при кліку на кнопку
  backBtn.forEach(button =>
    button.addEventListener('click', () => {
      modal.cocktailsModalContent.innerHTML = '';
      modal.backdrop.classList.add('is-hidden');
      modal.cocktailsModal.classList.add('is-hidden');
    })
  );

  // Закриття модалки при кліку на іконку
  modal.modalCloseBtn.addEventListener('click', () => {
    modal.cocktailsModalContent.innerHTML = '';
    modal.backdrop.classList.add('is-hidden');
    modal.cocktailsModal.classList.add('is-hidden');
  });
}

const handlerAddToFavotiteCocktail = (e, favouriteSvg) => {
  const id = e.target.getAttribute('data-id');
  const chosenCocktail = cocktails.find(item => item._id === id);
  const cocktailsModaFavoriteBtn = document.querySelector(
    '.cocktail-add-favorite-btn'
  );
  const favoriteCocktails =
    JSON.parse(localStorage.getItem('favoriteCocktails')) || [];

  if (e.target.innerText === ADD_TO_FAVORITE) {
    markAsFavorite(favouriteSvg);
    localStorage.setItem(
      'favoriteCocktails',
      JSON.stringify([...favoriteCocktails, chosenCocktail])
    );
    cocktailsModaFavoriteBtn.textContent = REMOVE_FROM_FAVORITE;
  } else {
    const filteredArr = favoriteCocktails.filter(item => item._id !== id);
    localStorage.setItem('favoriteCocktails', JSON.stringify(filteredArr));
    cocktailsModaFavoriteBtn.textContent = ADD_TO_FAVORITE;
    markAsFavorite(favouriteSvg);
  }
};
