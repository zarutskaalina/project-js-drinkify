// const openModalBtn = document.querySelector('.header-open-modal-btn');
// const closeModalBtn = document.querySelector('.burger-close-modal-btn');
// const modalBackdrop = document.querySelector('.burger-backdrop');
// const modal = document.querySelector('.burger-modal');

// function openModal() {
//     modalBackdrop.style.display = 'block';
//     modal.style.display = 'block';
// }


// function closeModal() {
//     modalBackdrop.style.display = 'none';
//     modal.style.display = 'none';
// }


// function onKeyPress(event) {
//     if (event.key === 'Escape') {
//         closeModal();
//     }
// }


// openModalBtn.addEventListener('click', openModal);
// closeModalBtn.addEventListener('click', closeModal);
// document.addEventListener('keydown', onKeyPress); 
const openModalBtn = document.querySelector('.header-open-modal-btn'); 
const closeModalBtn = document.querySelector('.burger-close-modal-btn'); 
const modalBackdrop = document.querySelector('.burger-backdrop'); 
const modal = document.querySelector('.burger-modal'); 
const favoriteLink = document.querySelector('.js-burger-list-link');

function openModal() {
    modalBackdrop.style.display = 'block'; 
    modal.style.display = 'block'; 
}

function closeModal() {
    modalBackdrop.style.display = 'none'; 
    modal.style.display = 'none'; 
}

function onKeyPress(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}


favoriteLink.addEventListener('click', function (event) {
    event.preventDefault();
});

openModalBtn.addEventListener('click', openModal); 
closeModalBtn.addEventListener('click', closeModal); 
document.addEventListener('keydown', onKeyPress);