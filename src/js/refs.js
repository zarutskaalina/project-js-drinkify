const backdrop = document.querySelector('.ingredient-modal-backdrop');
const ingredientsLists = document.querySelectorAll('.ingredients-list');
const ingredientModal = document.querySelector('.ingredient-modal');
const ingredientModaCloseButton = document.querySelector('.modal-close-btn');
const ingredientModaContent = document.querySelector(
  '.ingredient-modal-content'
);
const ingredientModaFavoriteButton = document.querySelector(
  '.ingredient-modal-favorite-btn'
);
const ingredientModaBackButton = document.querySelector(
  '.ingredient-modal-back-btn'
);

export default {
  ingredientsLists,
  backdrop,
  ingredientModal,
  ingredientModaCloseButton,
  ingredientModaContent,
  ingredientModaFavoriteButton,
  ingredientModaBackButton,
};
