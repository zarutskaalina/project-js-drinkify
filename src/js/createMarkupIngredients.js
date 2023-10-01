const cocktailsContainer = document.querySelector(".ingredients-cards");
const dataPlaceholder = document.querySelector(".ingredients-placeholder");


const dataCocktails = JSON.parse(localStorage.getItem('cocktails'));

let displayedCards = 6;

function renderCocktails() {
  const ingredientsCards = dataCocktails
    .slice(0, displayedCards)
    .map((cocktail) => `
    <div class="ingredient-card" data-id="${cocktail._id}">
      <h2 class="ingredient-title">${cocktail.title}</h2>
      <p class="alcohol-level">${cocktail.alcohol === "Yes" ? "Alcoholic" : "Non-Alcoholic"}</p>
      <p class="ingredient-description">${cocktail.description}</p>
      <div class="ingredients-buttons">
        <button type="button" class="learn-more-button button">learn more</button>
        <button type="button" class="ingredients-button-remove button">
          <svg class="icon-trash" width="18" height="18">
            <use href="./images/sprite.svg#icon-trash-mobile-white"></use>
          </svg>
        </button>
      </div>
    </div>
  `).join("");
  cocktailsContainer.innerHTML = ingredientsCards;

  if (dataCocktails.length > 0) {
  dataPlaceholder.style.display = "none";
  };
  if (dataCocktails.length === 0) {
  cocktailsContainer.style.display = "none";
  };
};

renderCocktails();




function onDeleteCardBtn(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('ingredients-button-remove')) {
    const cocktailId = clickedElement.closest('.ingredient-card').getAttribute('data-id');

    const indexToDelete = dataCocktails.findIndex(cocktail => cocktail._id === cocktailId);

    dataCocktails.splice(indexToDelete, 1);

    localStorage.setItem('cocktails', JSON.stringify(dataCocktails));

    renderCocktails();
  }
}

cocktailsContainer.addEventListener('click', onDeleteCardBtn);