// import axios from 'axios';
const cocktails = [
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
  {
    _id: '64aebb7f82d96cc69e0eb4a5',
    title: 'Applejack',
    thumb:
      'https://res.cloudinary.com/dy7bjyqln/image/upload/v1695418892/drinkify/recipes/Irish_Coffee.jpg',
    description:
      'Applejack is a strong apple-flavored alcoholic beverage produced from …',
  },
];

function fun(cocktails) {
  localStorage.setItem('cocktails', JSON.stringify(cocktails));
}
fun(cocktails);

// import svg from 'bundle-text:/src/images/favorite.svg';

const ulList = document.querySelector('.cocktails-list');

function createCocktails() {
  const theme = localStorage.getItem('cocktails');
  const cocktailsArr = JSON.parse(theme);
  return cocktailsArr;
}

const cocktailsArr = createCocktails();
console.log(cocktailsArr);

function createCard(array) {
  const markupLoad = array
    .map(
      array => `<li class="cocktails-item" id="${array._id}">
                    <img class="cocktails-image" src="${array.thumb}" alt="foto ${array.thumb}" />
                    <h3 class="cocktails-name">${array.title}</h3>
                    <p class="cocktails-description">${array.description}</p>
                    <div class="cocktails-buttons">
                    <button class="cocktails-button" data-id="${array._id}">learn more</button>
                    <button class="cocktails-button-favorite">
                    <svg class="icon" viewBox="0 0 24 24">
                    <use href="../images/sprite.svg#icon-trash-mobile-white"></use>
                    </svg>
                    </button>
                    </div>
          </li>`
    )
    .join(' ');
  ulList.innerHTML = markupLoad;
}

if (cocktailsArr) {
  createCard(cocktailsArr);
}

// --------------------------------------------------------------------------

// function main() {
//   const postData = cocktailsArr;
//   let currentPage = 1;
//   let rows = 6;

//   function displayList(arrData, rowPerPage, page) {
//     const ulList = document.querySelector('.cocktails-list');
//     const start = rowPerPage * page;
//     const end = start + rowPerPage;
//     const paginatedData = arrData.slice(start, end);
//   }
//   function displayPagination() {}
//   function displayPaginationBtn() {}
// }

// main();
