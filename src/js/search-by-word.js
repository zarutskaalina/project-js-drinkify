import axios from 'axios';
import { getCardInfo } from './cocktails-modal';
import { createMarkupCocktail } from './create-markup-cocktail';
import { favoriteHandler } from './favorite';

const BASE_URL = 'https://drinkify.b.goit.study/api/v1/cocktails/';
const searchForm = document.querySelector('.search-form');
const emptySearch = document.querySelector('.empty-search');
const listResults = document.querySelector('.cocktails-list');
const searchTitle = document.querySelector('.searching-results-title');
const randomCocktails = document.querySelector('.random-cocktails');
const searchContainer = document.querySelector('.searching-results');
const pagContainer = document.querySelector('.pagination-container');
const paginationNumbers = document.querySelector('#pagination-numbers');
const nextButton = document.querySelector('#next-button');
const prevButton = document.querySelector('#prev-button');
const innerWidthScreen = document.body.clientWidth;
const paginatedList = document.querySelector('#paginated-list');
emptySearch.style.display = 'none';
pagContainer.style.display = 'none';
let cocktails = [];
const getImages = async data => {
  const listImg = await makeRequest(data);
  if (listImg) {
    console.log('listImg', listImg.length);

    if (listImg.length > 0) {
      searchContainer.classList.remove('isHidden');
      emptySearch.style.display = 'none';
      randomCocktails.style.display = 'none';
      searchTitle.style.display = 'block';
    }
    paginationNumbers.innerHTML = '';
    renderImages(listImg);
  }
};

const searchInfoCallback = async e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  if (data.searchQuery.trim() === '') {
    listResults.innerHTML = '';
    return console.log('Please write the word in the field!');
  }
  paginatedList.innerHTML = '';
  getImages(data);

  e.currentTarget.reset();
};

function renderImages(images) {
  const markup = images.map(item => createMarkupCocktail(item)).join('');

  listResults.insertAdjacentHTML('afterbegin', markup);

  const learnMoreBtns = document.querySelectorAll('.cocktails-button');
  learnMoreBtns.forEach(button => {
    button.addEventListener('click', getCardInfo);
  });

  const favBtn = document.querySelectorAll('.cocktails-button-favorite');
  favBtn.forEach(bfv => {
    bfv.addEventListener('click', event => favoriteHandler(event, cocktails));
  });

  paginator();
}

searchForm.addEventListener('submit', searchInfoCallback);
const makeRequest = async data => {
  const searchParams = new URLSearchParams({
    s: data.searchQuery,
  });

  return axios
    .get(`${BASE_URL}search/?${searchParams.toString()}`)
    .then(res => {
      if (res.status === 200) {
        cocktails = res.data;
        return res.data;
      }

      throw new Error(res.statusText);
    })
    .catch(err => {
      errorMsg();
      // return console.log("such cocktails not found");
    });
};

function errorMsg() {
  emptySearch.style.display = 'block';
  pagContainer.style.display = 'none';
  searchTitle.style.display = 'none';
  randomCocktails.style.display = 'none';
  searchContainer.classList.add('isHidden');
  listResults.innerHTML = '';
}

function paginator() {
  pagContainer.style.display = 'flex';
  const listItems = paginatedList.querySelectorAll('li');
  let paginationLimit = 8;
  if (innerWidthScreen > 1279) {
    paginationLimit = 9;
  }
  console.log(innerWidthScreen, paginationLimit);
  console.log('listItems', listItems);
  console.log('paginationNumbers!!!!!!!!!!!!!');
  //  console.log("paginationNumbers last3", paginationNumbers.lastChild(n-3));
  const pageCount = Math.ceil(listItems.length / paginationLimit);
  console.log('pageCount', pageCount);
  if (pageCount === 1) {
    pagContainer.style.display = 'none';
    paginationNumbers.innerHTML = '';
  }
  let currentPage = 1;

  const disableButton = button => {
    button.classList.add('disabled');
    button.setAttribute('disabled', true);
  };

  const enableButton = button => {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
  };

  const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
      disableButton(prevButton);
    } else {
      enableButton(prevButton);
    }

    if (pageCount === currentPage) {
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    }
  };
  const handleActivePageNumber = () => {
    document.querySelectorAll('.pagination-number').forEach(button => {
      button.classList.remove('active');
      const pageIndex = Number(button.getAttribute('page-index'));
      if (pageIndex == currentPage) {
        button.classList.add('active');
      }
    });
  };
  const appendPageNumber = index => {
    const pageNumber = document.createElement('button');
    pageNumber.className = 'pagination-number';
    pageNumber.innerHTML = index;
    console.log('index', index);
    pageNumber.setAttribute('page-index', index);
    pageNumber.setAttribute('aria-label', 'Page ' + index);

    paginationNumbers.appendChild(pageNumber);

    //  console.log("paginationNumbers last3", paginationNumbers.lastChild(n-3));
  };
  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };
  const setCurrentPage = pageNum => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
      item.classList.add('hidden');
      if (index >= prevRange && index < currRange) {
        item.classList.remove('hidden');
      }
    });
  };
  if (listItems.length > paginationLimit) {
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener('click', () => {
      setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener('click', () => {
      setCurrentPage(currentPage + 1);
    });

    document.querySelectorAll('.pagination-number').forEach(button => {
      const pageIndex = Number(button.getAttribute('page-index'));

      if (pageIndex) {
        button.addEventListener('click', () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  }
}
