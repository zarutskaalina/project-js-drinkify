export const createMarkupCocktail = (cocktail) => {
   const { drink, drinkThumb, description } = cocktail;
   return `<li class="cocktails-item">
                    <img class="cocktails-image" src="${drinkThumb}" alt="foto ${drink}" />
                    <h3 class="cocktails-title">${drink}</h3>
                    <p class="cocktails-description">${description}</p>
                    <div class="cocktails-buttons">
                    <button class="cocktails-button">learn more</button>
                    <button class="cocktails-button-favorite">
                    <svg class="icon" width="24px" height="24px">
                        <use href="./images/sprite.svg#icon-favorites-mobile-white"></use>
                    </svg></button>
                    </div>
          </li>`
}