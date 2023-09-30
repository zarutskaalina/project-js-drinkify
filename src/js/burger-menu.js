const openModalBtn = document.querySelector('.header-open-modal-btn'); // Кнопка, яка відкриває модальне вікно бургера
const closeModalBtn = document.querySelector('.burger-close-modal-btn'); // Кнопка закриття модального вікна бургера
const modalBackdrop = document.querySelector('.burger-backdrop'); // Задня підложка модального вікна бургера
const modal = document.querySelector('.burger-modal'); // Модальне вікно бургера

// Функція для відкриття модального вікна бургера
function openModal() {
    modalBackdrop.style.display = 'block'; // Показати задню підложку
    modal.style.display = 'block'; // Показати модальне вікно
}

// Функція для закриття модального вікна бургера
function closeModal() {
    modalBackdrop.style.display = 'none'; // Приховати задню підложку
    modal.style.display = 'none'; // Приховати модальне вікно
}

// Функція для закриття модального вікна за допомогою клавіші "Esc"
function onKeyPress(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Додавання обробників подій
openModalBtn.addEventListener('click', openModal); // При кліку на кнопку відкриття модального вікна
closeModalBtn.addEventListener('click', closeModal); // При кліку на кнопку закриття модального вікна
document.addEventListener('keydown', onKeyPress); // При натисканні клавіші "Esc"