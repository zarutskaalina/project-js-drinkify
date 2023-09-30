import refs from './refs';
import { getIngredients } from './services';

let currentIngredient = null;

const setFavoriteButtonContent = (ingredientId) => { 
    const ingredients = localStorage.getItem('ingredients');
    
    if (ingredients) {
        const parsedIngredients = JSON.parse(ingredients);
        const isIngredientInFavorite = parsedIngredients.find(({ _id }) => ingredientId === _id);

        if (isIngredientInFavorite) { 
            refs.ingredientModaFavoriteButton.textContent = "Remove from favorite";
        }
    }
}

const modalContent = ({ 
    abv,
    alcohol,
    country,
    description,
    flavour,
    title,
    type
}) =>
    `<h2 class="ingredient-modal-title">${title}</h2>
    <h3 class="ingredient-modal-subtitle">${type}</h3>
    <div class="divider"></div>
    <p class="ingredient-modal-description">
      ${description}
    </p>
    <ul class="ingredient-modal-list">
      <li>Type: ${type}</li>
      <li>Country of origin: ${country}</li>
      ${alcohol === 'Yes' ? `<li>Alcohol by volume: ${abv} %</li>` : ''}
      <li>Flavour : ${flavour}</li>
    </ul>`;

getIngredients('64aebb7f82d96cc69e0eb4b1').then((res) => { 
    currentIngredient = res[0];
    setFavoriteButtonContent(res[0]["_id"]);

    const modalContentMarkup = modalContent(res[0]);
    refs.ingredientModaContent.insertAdjacentHTML('beforeend', modalContentMarkup);
});

const handleClose = () => {
    refs.ingredientModal.classList.remove('isShow');
}; 

const handleAddToFavorite = () => {
    const ingredients = localStorage.getItem('ingredients');

    if (ingredients) {
        const parsedIngredients = JSON.parse(ingredients);
        const isIngredientInFavorite = parsedIngredients.find(({ _id }) => currentIngredient['_id'] === _id);

        if (isIngredientInFavorite) {
            const filteredIngredients = parsedIngredients.filter(({ _id }) => currentIngredient['_id'] !== _id);
            localStorage.setItem('ingredients', JSON.stringify(filteredIngredients));
            refs.ingredientModaFavoriteButton.textContent = "Add to favorite";
        } else { 
            localStorage.setItem('ingredients', JSON.stringify([...parsedIngredients, currentIngredient]));
            refs.ingredientModaFavoriteButton.textContent = "Remove from favorite";
        }
    } else { 
        localStorage.setItem('ingredients', JSON.stringify([currentIngredient]));
    }
};

const handleBack = () => { };

refs.ingredientModaFavoriteButton.addEventListener('click', handleAddToFavorite);
refs.ingredientModaCloseButton.addEventListener('click', handleClose);