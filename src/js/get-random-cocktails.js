import axios from "axios";
import { createMarkupCocktail } from "./markup-cocktail";

const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const cocktailsListEl = document.querySelector('.cocktails .list'); 

const innerWidth = document.body.clientWidth;

const numberOfRandomCoctails = (innerWidth) => {
    let amount = 8;
    if (innerWidth > 768) {
        amount = 9; 
    } 
    console.log(innerWidth, amount);
    return amount;
}

export async function fetchRandomCocktails(numberOfRandomCocktails) {
    try {
        const finalUrl = BASE_URL + "cocktails"
        console.log(finalUrl)
        const response = await axios.get(finalUrl, {
            params: {
                r: numberOfRandomCocktails,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export function renderCocktails (arr, container) {
    console.log(arr);
    const markup = arr
        .map((item) => 
            createMarkupCocktail(item)
        )
        .join('');

    // console.log(markup);
    container.innerHTML = markup;
}

fetchRandomCocktails(numberOfRandomCocktails(innerWidth)).then((res) => renderCocktails(res, cocktailsListEl));

