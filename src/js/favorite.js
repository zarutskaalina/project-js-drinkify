export const chekFavorite = (button) => {
    const nameLS = 'cocktails';
    const item = button.firstElementChild;
    const currentId = button.getAttribute('data-id');
    const currentLS = JSON.parse(localStorage.getItem(nameLS));
    if (!currentId || !currentLS) return;
    if (currentLS.indexOf(currentId) !== -1) {
        item.classList.add('isFavorite');
    };
};

export const favoriteHandler = (e) => {
    const nameLS = 'cocktails';
    const item = e.currentTarget.firstElementChild;
    const currentId = e.currentTarget.getAttribute('data-id');
    const currentLS = JSON.parse(localStorage.getItem(nameLS)) || [];
    const index = currentLS.indexOf(currentId);
      
    if (!currentId) return;
    if (index === -1) {
        currentLS.push(currentId);
        item.classList.add('isFavorite');
    } else {
        currentLS.splice(index, 1);
        item.classList.remove('isFavorite');
    }
    localStorage.setItem(nameLS, JSON.stringify(currentLS));
};

