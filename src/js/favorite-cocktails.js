const ulList = document.querySelector('.cocktails-list');

function createCocktails() {
  try {
    const theme = localStorage.getItem('currentLS');
    const cocktailsArr = JSON.parse(theme);
    return cocktailsArr;
  } catch (error) {
    console.log(error.name); // "SyntaxError"
    console.log(error.message); // Unexpected token W in JSON at position 0
  }
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

// createCard(cocktailsArr);

ulList.addEventListener('click', onBtnDelCard);

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

    localStorage.setItem('currentLS', JSON.stringify(cocktailsArr));

    createCard(cocktailsArr);
  }
}

// currentLS

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
