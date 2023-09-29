const dropdownLink = document.querySelector('.js-header-list-link');
const dropdownMenu = document.querySelector('.js-header-dropdown');

let isMenuOpen = false;

function openHeaderDropdown() {
  dropdownMenu.style.display = 'block';
  isMenuOpen = true;
}

function closeHeaderDropdown() {
  dropdownMenu.style.display = 'none';
  isMenuOpen = false;
}

dropdownLink.addEventListener('click', function (e) {
  e.preventDefault(); 

  if (isMenuOpen) {
    closeHeaderDropdown(); 
  } else {
    openHeaderDropdown(); 
  }
});


document.addEventListener('click', function (e) {
  if (isMenuOpen && !dropdownLink.contains(e.target) && !dropdownMenu.contains(e.target)) {
    closeHeaderDropdown(); 
  }
});