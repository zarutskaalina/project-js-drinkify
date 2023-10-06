import axios from 'axios';

import { createMarkupCocktail } from './create-markup-cocktail';
import { getCardInfo } from './cocktails-modal';
import { favoriteHandler } from './favorite';
import { chekFavorite } from './favorite';

import Choices from 'choices.js';
// ============ КЛАВИАТУРА ===========
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';

// Контейнер для кнопок с буквами и цифрами
const alphabetButtons = document.querySelector('.alphabet-buttons');

// Контейнер для выпадающего списка на мобильной версии
const alphabetSelect = document.querySelector('.alphabet-select');

// Получаем элемент c рандомным списком коктейлей по его классу
const randomCocktailsElement = document.querySelector('.random-cocktails');

// Получаем контейнер в котором будет список коктейлей при нажатии на кнопку
const resultsContainer = document.querySelector('.searching-results');

// Получаем cписок в который будем добавлять коктейли
const resultsList = document.querySelector(
  '.searching-results .cocktails-list'
);

// Получаем заголовок блока в который будем добавлять список коктейлей и который сделаем видимым
const titleElement = document.querySelector('.searching-results-title');

// Получаем элемент для случаев, когда поиск не дал результатов  тогда делаем его видимым
const emptySearchElement = document.querySelector('.empty-search');

// Items for pagination
const pagContainer = document.querySelector('.pagination-container');
const paginationNumbers = document.querySelector('#pagination-numbers');
const nextButton = document.querySelector('#next-button');
const prevButton = document.querySelector('#prev-button');
const innerWidthScreen = document.body.clientWidth;
const paginatedList = document.querySelector('#paginated-list');

// Массив с буквами и цифрами
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];

// Создаем кнопки и добавляем их в контейнер
export function createAlphabetButtons() {
  alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.classList.add('letter-button');
    alphabetButtons.appendChild(button);

    // Добавляем асинхронный обработчик события для каждой кнопки
    button.addEventListener('click', async evt => {
      evt.preventDefault();
      const selectedLetter = letter;
      paginatedList.innerHTML = '';
      console.log('paginatedList', paginatedList);
      console.log(selectedLetter);
      // Отправляем запрос для поиска коктейлей по выбранной букве или цифре
      await searchCocktails(selectedLetter);
    });
  });
}

// Функция для настройки выпадающего списка с буквами и добавления обработчика события
export function configureAlphabetSelect() {
  // Создаем опции для выпадающего списка
  alphabet.forEach(letter => {
    if (letter.match(/[A-Z]/)) {
      // Проверяем, является ли текущий элемент буквой (A-Z) так как в массиве еще цифры
      const option = document.createElement('option');
      option.value = letter;
      option.textContent = letter;
      alphabetSelect.insertAdjacentElement('beforeend', option);
    }
  });
  paginatedList.innerHTML = '';
  // Добавляем обработчик события при выборе буквы в выпадающем списке
  alphabetSelect.addEventListener('change', async evt => {
    evt.preventDefault();

    // Получаем выбранную букву или цифру
    const selectedLetter = alphabetSelect.value;
    paginatedList.innerHTML = '';
    await searchCocktails(selectedLetter);
  });
}

// Функция для отправки запроса по букве или цифре
export async function searchCocktails(letter) {
  //  Очистить контейнер с результатами (там где коктейли будут отображаться)
  // resultsList.innerHTML = '';
  paginationNumbers.innerHTML = '';
  // Убираем класс hidden
  resultsContainer.classList.remove('isHidden');
  // Добавляем класс hidden
  randomCocktailsElement.classList.add('isHidden');

  // Убираем стиль "display: none"
  titleElement.style.display = 'block';

  try {
    const response = await axios.get(
      `${BASE_URL}cocktails/search/?f=${letter}`
    );
    const cocktails = response.data;
    if (cocktails.length !== 0) {
      //   код для отображения карточек с коктейлями
      const markup = cocktails.map(item => createMarkupCocktail(item)).join('');
      console.log(resultsList);
      emptySearchElement.style.display = 'none';
      resultsList.insertAdjacentHTML('beforeend', markup);
      // избранное
      const learnMoreBtns = document.querySelectorAll('.cocktails-button');
      learnMoreBtns.forEach(button => {
        button.addEventListener('click', getCardInfo);
      });

      const favBtn = document.querySelectorAll('.cocktails-button-favorite');
      favBtn.forEach(bfv => {
        bfv.addEventListener('click', event =>
          favoriteHandler(event, cocktails)
        );
      });

      paginator();
      console.log(resultsList);
    }
  } catch (error) {
    // Обработка ошибок при запросе к API
    pagContainer.style.display = 'none';
    console.error('Произошла ошибка при отправке запроса:', error);
    // Если поиск пустой, то
    resultsContainer.classList.add('isHidden');
    emptySearchElement.style.display = 'block';
    resultsList.innerHTML = '';
  }
}

createAlphabetButtons();
configureAlphabetSelect();

alphabetSelect.classList.add('js-choice');

const choices = new Choices(alphabetSelect, {
  items: alphabet,
  maxItemCount: 1,
  allowHTML: true,
  searchEnabled: false, // Убирает тсроку для поиска
  shouldSortItems: false,
  itemSelectText: '', // Убирает текст "Press to select"
  placeholder: false,
  position: 'bottom',
});

function paginator() {
  pagContainer.style.display = 'flex';
  const listItems = paginatedList.querySelectorAll('li');
  let paginationLimit = 8;
  if (innerWidthScreen > 1279) {
    paginationLimit = 9;
  }
  console.log(innerWidthScreen, paginationLimit);
  console.log('listItems', listItems);
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
