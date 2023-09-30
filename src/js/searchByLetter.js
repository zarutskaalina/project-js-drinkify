import axios from 'axios';

// !!Импортируй после того как Алина пример ветку Антона
// import { createMarkupCocktail } from './createMarkupCocktail';

// import Choices from 'choices.js';
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

      // Отправляем запрос для поиска коктейлей по выбранной букве или цифре
      await searchCocktails(selectedLetter);
    });
  });
}

// Функция для настройки выпадающего списка с буквами и добавления обработчика события
export function configureAlphabetSelect() {
  // Создаем опции для выпадающего списка
  alphabet.forEach(letter => {
    const option = document.createElement('option');
    option.value = letter;
    option.textContent = letter;
    alphabetSelect.insertAdjacentElement('beforeend', option);
  });

  // Добавляем обработчик события при выборе буквы в выпадающем списке
  alphabetSelect.addEventListener('change', async () => {
    // Получаем выбранную букву или цифру
    const selectedLetter = alphabetSelect.value;
    searchCocktails(selectedLetter);
  });
}

// Функция для отправки запроса по букве или цифре
export async function searchCocktails(letter) {
  // !!!! Очистить контейнер с результатами (там где коктейли будут отображаться) после того как Алина примет ветку Антона
  // const resultsContainer = document.querySelector('.searcing-results');
  // resultsContainer.innerHTML = '';

  try {
    const response = await axios.get(
      `${BASE_URL}cocktails/search/?f=${letter}`
    );
    const cocktails = response.data;

    if (cocktails.length === 0) {
      //  !! вставить вывод модалки или что там когда коктейли не найдены
    } else {
      // !! Вставить код для отображения карточек с коктейлями после того как Алина примет ветку Антона
      // const markup = cocktails.map(item => createMarkupCocktail(item)).join('');
      // resultsContainer.innerHTML = markup;
    }
  } catch (error) {
    // Обработка ошибок при запросе к API
    console.error('Произошла ошибка при отправке запроса:', error);
    //!! Вставить код для отображения сообщения об ошибке или другой обработки ошибки
  }
}

// Функция для проверки размера экрана и отображения/скрытия элементов
// function toggleElementsBasedOnScreenSize() {
//   const screenWidth = window.innerWidth; // Получаем текущую ширину экрана

//   // Получаем элементы, которые нужно скрыть/отобразить

//   // Контейнер для кнопок с буквами и цифрами
//   const alphabetButtons = document.querySelector('.alphabet-buttons');

//   // Контейнер для выпадающего списка на мобильной версии
//   const alphabetSelect = document.querySelector('.alphabet-select');

//   if (screenWidth <= 768) {
//     // Если экран меньше или равен 768px, скрываем кнопки и отображаем выпадающий список
//     alphabetButtons.style.display = 'none';
//     alphabetSelect.style.display = 'block';
//   } else {
//     // Если экран шире 768px, отображаем кнопки и скрываем выпадающий список
//     alphabetButtons.style.display = 'flex';
//     alphabetSelect.style.display = 'none';
//   }
// }

// Вызываем функцию при загрузке страницы и при изменении размера окна
// window.addEventListener('load', toggleElementsBasedOnScreenSize);
// window.addEventListener('resize', toggleElementsBasedOnScreenSize);

// alphabetSelect.classList.add('js-choice');

// const choices = new Choices(alphabetSelect, {
//   items: alphabet,
//   maxItemCount: 1,
//   allowHTML: true,
// });

createAlphabetButtons();
configureAlphabetSelect();
