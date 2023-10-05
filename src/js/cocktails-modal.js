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
  console.log(data);
});

console.log(cocktails);

const modal = {
  backdrop: document.querySelector('.cocktails-modal-backdrop'),
  cocktailsModal: document.querySelector('.cocktails-modal'),
  cocktailsModalContent: document.querySelector('.cocktails-modal-content'),
  modalCloseBtn: document.querySelector('.modal-close-btn'),
  cocktailsModaFavoriteBtn: document.querySelector(
    '.cocktail-add-favorite-btn'
  ),
  backBtn: document.querySelectorAll('.cocktail-back-btn'),
};

// Розмітка для модалки
function renderModalContent(chosenElement) {
  const { _id, drink, glass, instructions, drinkThumb, ingredients } =
    chosenElement;
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
<p class="cocktails-instructions">${instructions}</p>`;
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

  //Закриття модалки при кліку на бекдроп
  modal.backdrop.addEventListener('click', () => {
    modal.cocktailsModalContent.innerHTML = '';
    modal.backdrop.classList.add('is-hidden');
    modal.cocktailsModal.classList.add('is-hidden');
  });

  // modal.cocktailModaFavoriteBtn.setAttribute(
  //   'data-id',
  //   cocktailsId
  // );

  modal.cocktailsModaFavoriteBtn.addEventListener(
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

  // Закриття модалки при кліку на кнопку

  modal.backBtn.forEach(button =>
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

const handlerAddToFavotiteCocktail = e => {
  const ADD_TO_FAVORITE = 'ADD TO FAVORITE';
  const REMOVE_FROM_FAVORITE = 'REMOVE FROM FAVORITE';
  const id = e.target.getAttribute('data-id');
  console.log(id);
  console.log(cocktails);
  const chosenCocktail = cocktails.find(item => item._id === id);
  console.log(chosenCocktail);
  const favoriteCocktails =
    JSON.parse(localStorage.getItem('favoriteCocktails')) || [];

  if (e.target.innerText === ADD_TO_FAVORITE) {
    localStorage.setItem(
      'favoriteCocktails',
      JSON.stringify([...favoriteCocktails, chosenCocktail])
    );
    modal.cocktailsModaFavoriteBtn.textContent = REMOVE_FROM_FAVORITE;
  } else {
    const filteredArr = favoriteCocktails.filter(item => item._id !== id);
    localStorage.setItem('favoriteCocktails', JSON.stringify(filteredArr));
    modal.cocktailsModaFavoriteBtn.textContent = ADD_TO_FAVORITE;
  }

  // resolveFavoriteCocktailBtn(cocktailsBtnId);
};

// const resolveFavoriteCocktailBtn = cocktailsBtnId => {
//   const existingId = localStorage.getItem('favoriteCocktails');
//   console.log(existingId);
//   if (existingId) {
//     const savedId = JSON.parse(localStorage.getItem('favoriteCocktails'));
//     console.log();
//     // const isCocktailInStorage = savedId.find(item => item._id === existingId);
//     //   if (isCocktailInStorage) {
//     //     cocktailsContainer.cocktailModaFavoriteBtn.textContent =
//     //       'REMOVE FROM FAVORITE';
//     //   } else {
//     //     cocktailsContainer.cocktailModaFavoriteBtn.textContent =
//     //       'ADD TO FAVORITE';
//     //   }
//   }
// };
