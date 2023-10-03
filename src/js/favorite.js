export const setFavoriteButtonContent = (id,nameLocalStorage) => {
    const currentLS = localStorage.getItem(nameLocalStorage);
    const favoriteButton = document.querySelector('js-favorite-button');
    const favoriteButtonHeart = document.querySelector('js-favorite-button-heart');


    if (currentLS) {
        const parsedCurrentLS = JSON.parse(nameLocalStorage);
        const isInFavorite = parsedCurrentLS.find(({ _id }) => id === _id);

        if (isInFavorite) {
            favoriteButton.textContent = "Remove from favorite";
            favoriteButtonHeart.classList.add(isFavorite);
        } else { 
            favoriteButton.textContent = "Add to favorite";
            favoriteButtonHeart.classList.remove(isFavorite);
        }
    }
};

export const handleAddToFavorite = (event,nameLocalStorage) => {
    const currentLS = localStorage.getItem(nameLocalStorage);
    const id = event.target.getAttribute('data-id');
    const currentItem = JSON.parse(localStorage.getItem(id));

    if (currentLS) {
        const parsedItems = JSON.parse(currentLS);
        const isInFavorite = parsedItems.find(({ _id }) => currentItem['_id'] === _id);

        if (isInFavorite) {
            const filteredCurrentItem = parsedItems.filter(({ _id }) => currentItems['_id'] !== _id);
            localStorage.setItem(currentLS, JSON.stringify(filteredCurrentItem));
            favoriteButton.textContent = "Add to favorite";
            favoriteButtonHeart.classList.add(isFavorite);
        } else { 
            localStorage.setItem(currentLS, JSON.stringify([...parsedItems, currentItem]));
            favoriteButton.textContent = "Remove from favorite";
        }
    } else { 
        localStorage.setItem(currentLS, JSON.stringify([currentItem]));
    }

    setFavoriteButtonContent(currentItem['_id']);
};
