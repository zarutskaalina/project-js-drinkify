import svg from 'bundle-text:/src/images/favorite.svg';

export const createMarkupCocktail = cocktail => {
  const { _id, drink, drinkThumb, description } = cocktail;
  return `<li class="cocktails-item" id="${_id}">
                    <img class="cocktails-image" src="${drinkThumb}" alt="foto ${drink}" />
                    <h3 class="cocktails-name">${drink}</h3>
                    <p class="cocktails-description">${description}</p>
                    <div class="cocktails-buttons">
                    <button class="cocktails-button" data-id="${_id}">learn more</button>
                    <button class="cocktails-button-favorite" data-id="${_id}">
                    <svg class="icon" viewBox="0 0 24 24">
                    ${svg}
                    </svg>
                    </button>
                    </div>
          </li>`;
};
