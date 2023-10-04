const burgerListLink = document.querySelector('.js-burger-list-link');
const burgerDropdown = document.querySelector('.burger-dropdown');
const iconHeader = document.querySelector('.header-list-link-icon');
const dropdownLink = document.querySelector('.js-header-list-link');
const dropdownMenu = document.querySelector('.js-header-dropdown');

let isBurgerMenuOpen = false;
let isHeaderMenuOpen = false;

function toggleBurgerDropdown() {
  event.preventDefault();

  if (burgerDropdown.style.display === 'block') {
    burgerDropdown.style.display = 'none';
  } else {
    burgerDropdown.style.display = 'block';
  }
}

function toggleHeaderDropdown() {
  event.preventDefault();

  if (isHeaderMenuOpen) {
    closeHeaderDropdown();
  } else {
    openHeaderDropdown();
  }
}

function openHeaderDropdown() {
  dropdownMenu.style.display = 'block';
  isHeaderMenuOpen = true;
}

function closeHeaderDropdown() {
  dropdownMenu.style.display = 'none';
  isHeaderMenuOpen = false;
}

burgerListLink.addEventListener('click', toggleBurgerDropdown);
iconHeader.addEventListener('click', toggleBurgerDropdown);
dropdownLink.addEventListener('click', toggleHeaderDropdown);

document.addEventListener('click', function (e) {
  if (isHeaderMenuOpen && !dropdownLink.contains(e.target) && !dropdownMenu.contains(e.target)) {
    closeHeaderDropdown();
  }
});