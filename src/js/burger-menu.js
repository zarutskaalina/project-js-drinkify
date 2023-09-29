
const openModalBtn = document.querySelector('.header-open-modal-btn');
const closeModalBtn = document.querySelector('.burger-close-modal-btn');
const modal = document.querySelector('.burger-backdrop');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function onKeyPress(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', onKeyPress);