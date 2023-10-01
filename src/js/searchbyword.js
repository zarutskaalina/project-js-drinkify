import axios from 'axios';
import { createMarkupCocktail } from "./createMarkupCocktail";
// // import { paginator } from './paginator.js';

const BASE_URL = "https://drinkify.b.goit.study/api/v1/cocktails/";
const searchForm = document.querySelector(".search-form");
const emptySearch = document.querySelector(".empty-search");
const listResults = document.querySelector(".cocktails-list");
const searchTitle = document.querySelector(".searching-results-title");
const randomCocktails = document.querySelector(".random-cocktails");
const searchContainer = document.querySelector(".searching-results");
emptySearch.style.display = 'none';
const innerWidth = document.body.clientWidth;

const numberOfRandomCocktails = (innerWidth) => {
    let amount = 8;
    if (innerWidth > 1279) {
        amount = 9; 
    } 
    console.log(innerWidth, amount);
    return amount;
} 
    
const getImages = async (data) => {
    const listImg = await makeRequest(data);
    if (listImg) {
        
        console.log("listImg", listImg.length);
        
        if (listImg.length > 0) {
            searchContainer.classList.remove("isHidden");
            emptySearch.style.display = 'none';
            randomCocktails.style.display = 'none';
            searchTitle.style.display = 'block';
        }
        renderImages(listImg);
        // paginator();
        
    }
        
}

const searchInfoCallback = async (e) => {
  e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("data", data);
    if (data.searchQuery.trim() === "") {
        listResults.innerHTML = '';
        return console.log("Please write the word in the field!");
    }
    getImages(data);
    
      e.currentTarget.reset();
  } 

  
        
//   const totHits = await makeRequest(data, page);
//   Notify.info(`Hooray! We found ${totHits.totalHits} images.`);
 
//       const loadMoreHandler = () => {
//       page += 1;
//       getImages (data, page);
//       };
//       // loadMoreEl.onclick = () => {
//       //   window.scrollTo({
//       //     top: 0,
//       //     left: 0,
//       //     behavior: 'smooth'
//       //   });
//       // }
//       loadMoreEl.addEventListener("click", loadMoreHandler);
  
//   };



function renderImages(images) {
    const markup = images
        .map((item) => 
            createMarkupCocktail(item)
        )
        .join('');
    
    listResults.insertAdjacentHTML("afterbegin", markup);
    
}
searchForm.addEventListener("submit", searchInfoCallback);
const makeRequest = async (data) => {
      
    const searchParams = new URLSearchParams({
        s: data.searchQuery,
    });
    
  
    return axios.get(`${BASE_URL}search/?${searchParams.toString()}`)
        .then((res) => {
            if (res.status === 200) {
                // console.log(res);
                return res.data;
            }
        
            throw new Error(res.statusText);
        })
        // .then((res) => {
            
        //        searchTitle.style.display = 'flex';
        //        return console.log(emptySearch);
            
        // })
        // .then((res) => {
        //     loadMoreEl.classList.replace("load-more-hidden", "load-more");
        //     console.log(page * res.hits.length);
        //     if ((page * res.hits.length) >= res.totalHits) {
        //         loadMoreEl.classList.replace("load-more", "load-more-hidden");
        //         // infoMsg();
        //     }
        //     return res;
        // })
        .catch((err) => {
            
            errorMsg();
            // return console.log("such cocktails not found");
        })
}

function errorMsg() {
    emptySearch.style.display = 'block';
    searchTitle.style.display = 'none'
    listResults.innerHTML = '';
    // console.log("emptySearch", emptySearch);
}


