// const cocktails = [
//   {
//     _id: '1',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '2',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '3',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '4',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '5',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '6',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '7',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '8',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '9',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '10',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '11',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '12',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
//   {
//     _id: '13',
//     title: 'Applejack',
//     thumb:
//       'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
//     description:
//       'Applejack is a strong apple-flavored alcoholic beverage produced from …',
//   },
// ];

// function fun(cocktails) {
//   localStorage.setItem('currentLS', JSON.stringify(cocktails));
// }
// fun(cocktails);

const ulList = document.querySelector('.cocktails-list');
const forhiden = document.querySelector('.forhiden');

// ця функція дістеє з локального і робить масив - ----------------------
function createCocktails() {
  try {
    const theme = localStorage.getItem('favoriteCocktails');
    const cocktailsArr = JSON.parse(theme);
    if (cocktailsArr.length > 0) {
      console.log('55');
      forhiden.setAttribute('hidden', 'hidden');
    }
    return cocktailsArr;
  } catch (error) {
    console.log(error.name); // "SyntaxError"
    console.log(error.message); // Unexpected token W in JSON at position 0
  }
}

const cocktailsArr = createCocktails();

console.log(cocktailsArr);

// вункція створення карток з масиву------------------------------------
function createCard(array) {
  const markupLoad = array
    .map(
      array => `<li class="cocktails-item" id="${array._id}">
                    <img class="cocktails-image" src="${array.thumb}" alt="foto ${array.thumb}" />
                    <h3 class="cocktails-name">${array.title}</h3>
                    <p class="cocktails-description">${array.description}</p>
                    <div class="cocktails-buttons">
                    <button class="cocktails-button" data-id="${array._id}">learn more</button>
                    <button class="cocktails-button-favorite trash-btn">
                    <svg class="icon">
                    <use href="../images/sprite.svg#icon-trash-mobile-white"></use>
                    </svg>
                    </button>
                    </div>
          </li>`
    )
    .join(' ');
  ulList.innerHTML = markupLoad;
}
createCard(cocktailsArr);

// видалення картки по кнопці------------------------------
function onBtnDelCard(event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('trash-btn')) {
    const cocktailId = clickedElement
      .closest('.cocktails-item')
      .getAttribute('id');

    console.log(cocktailId);

    const indexToDelete = cocktailsArr.findIndex(
      cocktail => cocktail._id === cocktailId
    );

    cocktailsArr.splice(indexToDelete, 1);

    localStorage.setItem('favoriteCocktails', JSON.stringify(cocktailsArr));

    createCard(cocktailsArr);

    if (cocktailsArr.length <= 0) {
      console.log('56');
      console.log(cocktailsArr.length);
      forhiden.removeAttribute('hidden');
    }
  }
}
ulList.addEventListener('click', onBtnDelCard);
// currentLS

// --------------------------------------------------------------------------
