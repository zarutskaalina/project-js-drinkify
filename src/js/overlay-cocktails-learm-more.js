import axios from 'axios';

const learnMoreBtn = document.querySelector('.learn-more-btn');
const cocktailsCardInfo = document.querySelector('.cocktails-container');

function fetchCards() {
  return fetch('https://drinkify.b.goit.study/api/v1/cocktails/lookup')
    .then(resp => resp.json())
    .then(data => data)
    .catch(err => err);
}

function renderMarkup(cocktails) {
  const markup = cocktails
    .map(cocktail => {
      const { _id, drink, glass, instructions, drinkThumb, ingredients } =
        cocktail;
      return `<div class="cocktails-container">
      <div class="cocktails-desc">
        <img src="${drinkThumb}" alt="${glass}" class="cocktails-img" width="200" />
        <h3 class="cocktails-title">${drink}<b></b></h3>
        <h3 class="cocktails-ingredients-title"><b>Indredients:</b></h3>
        <ul class="indredients-list">
          <li>${ingredients}</li>
        </ul>
        <h3 class="cocktails-instructions-title"><b>Instructions:</b></h3>
        <p class="cocktails-instructions">${instructions}</p>
      </div>
      <div class="cocktails btn">
        <button class="add-favorite-btn" data-id="${_id}">ADD TO fAVORITE</button>
        <button class="back-btn">BACK</button>
      </div>`;
    })
    .join('');

  cocktailsCardInfo.insertAdjacentHTML('beforeend', markup);
  const addFavouriteBtn = document.querySelectorAll('.add-favorite-btn');

  addFavouriteBtn.forEach(item => {
    item.addEventListener('click', doSomeAction);
  });
}

learnMoreBtn.addEventListener('click', getCardInfo);

function getCardInfo() {
  fetchCards()
    .then(result => {
      return renderMarkup(result);
      // console.log(result);
    })
    .catch(err => console.log(err));
}

function renderModalContent(chosenElement) {
  const { _id, drink, glass, instructions, drinkThumb, ingredients } =
    chosenElement;
  return `<div class="cocktails-container">
      <div class="cocktails-desc">
      <div class="cocktails-item">
        <img src="${drinkThumb}" alt="${glass}" class="cocktails-img" width="200" />
        <ul class="indredients-list">
        <h3 class="cocktails-title">${drink}<b></b></h3>
        <h3 class="cocktails-ingredients-title"><b>Indredients:</b></h3>
          <li>${ingredients}</li>
        </ul>
        </div>
        <h3 class="cocktails-instructions-title"><b>Instructions:</b></h3>
        <p class="cocktails-instructions">${instructions}</p>
      </div>
      <div class="cocktails btn">
        <button class="add-favorite-btn" data-id="${_id}">ADD TO fAVORITE</button>
        <button class="back-btn">BACK</button>
      </div>`;
}

const doSomeAction = async event => {
  const id = event.target.getAttribute('data-id');
  const cards = await fetchCards();
  const chosenElement = cards.find(item => item._id === id);

  if (chosenElement) {
    const modal = document.querySelector('.test');
    modal.style.display = 'block';
    const modalContent = renderModalContent(chosenElement);
    modal.insertAdjacentHTML('beforeend', modalContent);
  }
};
