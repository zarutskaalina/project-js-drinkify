import axios from 'axios';

import { createMarkupCocktail } from './createMarkupCocktail';

import Choices from 'choices.js';
// ============ КЛАВИАТУРА ===========
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';

// Контейнер для кнопок с буквами и цифрами
const alphabetButtons = document.querySelector('.alphabet-buttons');

// Контейнер для выпадающего списка на мобильной версии
const alphabetSelect = document.querySelector('.alphabet-select');

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
    button.addEventListener('click', async () => {
      const selectedLetter = letter;
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

  // Добавляем обработчик события при выборе буквы в выпадающем списке
  alphabetSelect.addEventListener('change', async () => {
    // Получаем выбранную букву или цифру
    const selectedLetter = alphabetSelect.value;
    await searchCocktails(selectedLetter);
  });
}

// Получаем элемент c рандомным списком коктейлей по его классу
const randomCocktailsElement = document.querySelector('.random-cocktails');

// Получаем cписок в который будем добавлять список коктейлей
const resultsList = document.querySelector(
  '.searching-results .cocktails-list'
);

// Получаем контейнер с которому убираем скрытый класс
const resultsContainer = document.querySelector('.searching-results');

// Получаем заголовок блока в который будем добавлять список коктейлей и который сделаем видимым
const titleElement = document.querySelector('.searching-results-title');

// Функция для отправки запроса по букве или цифре
export async function searchCocktails(letter) {
  //  Очистить контейнер с результатами (там где коктейли будут отображаться)
  resultsList.innerHTML = '';

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
    console.log(cocktails);
    if (cocktails.length !== 0) {
      //   код для отображения карточек с коктейлями
      const markup = cocktails.map(item => createMarkupCocktail(item)).join('');
      console.log(resultsList);
      resultsList.insertAdjacentHTML('beforeend', markup);
      console.log(resultsList);
    } else {
      //  !! вставить вывод модалки или что там когда коктейли не найдены
    }
  } catch (error) {
    // Обработка ошибок при запросе к API
    console.error('Произошла ошибка при отправке запроса:', error);
    //!! Вставить код для отображения сообщения об ошибке или другой обработки ошибки
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
  shouldSortItems: false, //!предотвращает сортировку элементов. Так хули оно не с "А" начинается
  itemSelectText: '', // Убирает текст "Press to select"
  placeholder: false,
  position: 'bottom',
});
