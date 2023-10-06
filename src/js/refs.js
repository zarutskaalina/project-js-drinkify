const backdrop = document.querySelector('.ingredient-modal-backdrop');
const ingredientsLists = document.querySelectorAll('.ingredients-list');
const ingredientModal = document.querySelector('.ingredient-modal');
const ingredientModalCloseButton = document.querySelector('.ingredient-modal-close-btn');
const ingredientModalContent = document.querySelector(
  '.ingredient-modal-content'
);
const ingredientModalFavoriteButton = document.querySelector(
  '.ingredient-modal-favorite-btn'
);
const ingredientModalBackButton = document.querySelector(
  '.ingredient-modal-back-btn'
);

export default {
  ingredientsLists,
  backdrop,
  ingredientModal,
  ingredientModalCloseButton,
  ingredientModalContent,
  ingredientModalFavoriteButton,
  ingredientModalBackButton,
};
