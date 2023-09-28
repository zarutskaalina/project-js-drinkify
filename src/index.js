import { fetchRandomCocktails } from "./js/get-random-cocktails";
import { renderCocktails } from "./js/get-random-cocktails";

const cocktailsListEl = document.querySelector('.cocktails .list')
const numberOfRandomCocktails = 8;

fetchRandomCocktails(numberOfRandomCocktails).then((res) => renderCocktails(res, cocktailsListEl));

