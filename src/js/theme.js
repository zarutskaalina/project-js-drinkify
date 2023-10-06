const checkedBtn = document.getElementById('switch-theme-slider');
const checkebMobileBtn = document.getElementById('burger-switch-theme-slider');
const themeValue = document.querySelector('html');

const getLocalSrorageTheme = () => {
  if (localStorage.getItem('theme') === 'dark') {
    themeValue.dataset.theme = 'dark';
    checkedBtn.checked = true;
    checkebMobileBtn.checked = true;
  }
};
getLocalSrorageTheme();

checkedBtn.onchange = function () {
  if (this.checked) {
    localStorage.setItem('theme', 'dark');
    themeValue.dataset.theme = 'dark';
  } else {
    localStorage.setItem('theme', 'light');
    themeValue.dataset.theme = 'light';
  }
};

checkebMobileBtn.onchange = function () {
  if (this.checked) {
    localStorage.setItem('theme', 'dark');
    themeValue.dataset.theme = 'dark';
  } else {
    localStorage.setItem('theme', 'light');
    themeValue.dataset.theme = 'light';
  }
};
