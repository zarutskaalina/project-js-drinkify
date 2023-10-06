// export const chekFavorite = button => {
//   const nameLS = 'favoriteCocktails';
//   const item = button.firstElementChild;
//   const currentId = button.getAttribute('data-id');
//   const currentLS = JSON.parse(localStorage.getItem(nameLS));
//   if (!currentId || !currentLS) return;
//   if (currentLS.indexOf(currentId) !== -1) {
//     item.classList.add('isFavorite');
//   }
// };

// export const favoriteHandler = e => {
//   const event = e.currentTarget || e;
//   const nameLS = 'favoriteCocktails';
//   const item = event.firstElementChild; // case for cocktails-modal
//   const currentId = event.getAttribute('data-id');
//   const currentLS = JSON.parse(localStorage.getItem(nameLS)) || [];
//   const index = currentLS.findIndex(item => item._id === currentId);

//   if (!currentId) return;
//   if (index === -1) {
//     currentLS.push(currentId);
//     item.classList.add('isFavorite');
//   } else {
//     currentLS.splice(index, 1);
//     item.classList.remove('isFavorite');
//   }
//   localStorage.setItem(nameLS, JSON.stringify(currentLS));
// };

export function favoriteHandler(event, cocktails) {
  // console.log(cocktails);
  const id = event.currentTarget.getAttribute('data-id');
  const favoriteCocktails =
    JSON.parse(localStorage.getItem('favoriteCocktails')) || [];
  const index = favoriteCocktails.findIndex(item => item._id === id);
  if (index === -1) {
    const chosenCocktail = cocktails.find(item => item._id === id);
    favoriteCocktails.push(chosenCocktail);
    markAsFavorite(event.currentTarget);
  } else {
    favoriteCocktails.splice(index, 1);
    markAsFavorite(event.currentTarget);
  }
  localStorage.setItem('favoriteCocktails', JSON.stringify(favoriteCocktails));
}

export function markAsFavorite(event) {
  const svg = event.firstElementChild;
  if (!svg.classList.contains('isFavorite')) {
    svg.classList.add('isFavorite');
  } else {
    svg.classList.remove('isFavorite');
  }
}
