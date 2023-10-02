// import axios from 'axios';
import { Notify } from 'notiflix';
import { renderCocktails } from './get-random-cocktails';
import { createMarkupCocktail } from './createMarkupCocktail';
import { fetchRandomCocktails } from './get-random-cocktails';

const cocktailsCardInfo = document.querySelector('.cocktails-container');

function fetchCards() {
  return fetch('https://drinkify.b.goit.study/api/v1/cocktails/lookup')
    .then(resp => resp.json())
    .then(data => data)
    .catch(err => err);
}

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
                  ${measure} ${title}
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

export function getCardInfo(event) {
  fetchCards()
    .then(result => {
      const id = event.target.getAttribute('data-id');
      const chosenElement = result.find(item => item._id === id);
      cocktailsCardInfo.style.display = 'none';

      if (chosenElement) {
        cocktailsCardInfo.style.display = 'block';
        const modalContent = renderModalContent(chosenElement);
        cocktailsCardInfo.insertAdjacentHTML('beforeend', modalContent);

        // const addFavoriteCocktailsBtn =
        //   document.querySelector('.add-favorite-btn');
        // addFavoriteCocktailsBtn.addEventListener(
        //   'click',
        //   handlerAddFavoriteCocktails
        // );

        const backBtn = document.querySelectorAll('.back-btn');
        backBtn.addEventListener('click', () => {
          cocktailsCardInfo.classList.toggle('is-hidden');
        });
      }
    })
    .catch(err => console.log(err));
}

// function handlerAddFavoriteCocktails(e) {}

// const dataCocktails = JSON.parse(localStorage.setItem('cocktails'));
