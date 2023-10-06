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
    checkebMobileBtn.checked = true;
  } else {
    localStorage.setItem('theme', 'light');
    themeValue.dataset.theme = 'light';
    checkebMobileBtn.checked = false;
  }
};

checkebMobileBtn.onchange = function () {
  if (this.checked) {
    localStorage.setItem('theme', 'dark');
    themeValue.dataset.theme = 'dark';
    checkedBtn.checked = true;
  } else {
    localStorage.setItem('theme', 'light');
    themeValue.dataset.theme = 'light';
    checkedBtn.checked = false;
  }
};
