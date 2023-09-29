
import axios from 'axios';
import {paginator} from './paginator.js';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "https://drinkify.b.goit.study/api/v1/cocktails/";
const searchWord = document.querySelector('input');
const button = document.querySelector(".searching-button");
const searchForm = document.querySelector(".search-form");
const resultsContainer = document.querySelector(".searching-results");
const emptySearch = document.querySelector(".empty-search");
const listResults = document.querySelector(".searching-results");
// console.log("paginatedList", listResults);

// emptySearch.style.display = 'none';

const getImages = async (data) => {
    const listImg = await makeRequest(data);

    if (listImg) {
        console.log("listImg", listImg.length);
      
        // if (listImg.length === 0) {
        //     resultsContainer.innerHTML = '';
        //     return;
        // }
        renderImages(listImg);
    }
        
}

const searchInfoCallback = async (e) => {
  e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("data", data);
    if (data.searchQuery.trim() === "") {
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
// console.log(searchWord);
// console.log(button);
// console.log(searchForm);
// console.log(resultsContainer);


function renderImages(images) {
   const markup = images.map(({ drink, description, drinkThumb}) => `
    <li class="cocktail-card"><img src="${drinkThumb}" alt="${drink}" loading="lazy" class="cocktail-image"/>
        <h2>${drink}</h2> 
        <div class="info"><p class="cocktail-description"> ${description}</p></div>
        <div class=""><button type="button" class="learn-more-button">Learn More</button> <button type="button" class="favorite"><svg class="icon" width="24px" height="24px"><use href="./images/sprite.svg#icon-favorites-tablet-desktop-white"></use></svg> </button> </div></div></li> 
        `)
        .join("");
   
    
    // const markup = images.map(({ drink, description, drinkThumb}) => `<div class="cocktail-card"> 
    //     <img src="${drinkThumb}" alt="${drink}" loading="lazy" class="cocktail-image"/>
    //     <h2>${drink}</h2> 
    //     <div class="info"><p class="cocktail-description"> ${description}</p></div>
    //     <div class=""><button type="button" class="learn-more-button">Learn More</button> <button type="button" class="favorite"><svg class="icon" width="24px" height="24px"><use href="./images/sprite.svg#icon-favorites-tablet-desktop-white"></use></svg> </button> </div></div>`)
    //     .join("");
   
    listResults.innerHTML = markup;
  
    // paginator();
    
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
        //     if (res.status === 404) {
        //        emptySearch.style.display = 'block';
        //        return console.log(emptySearch);
        //     }
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
            return console.log("such cocktails not found");
        })
}

function errorMsg() {
    resultsContainer.innerHTML = emptySearch.textContent;
    emptySearch.style.display = 'block';
    console.log("emptySearch", emptySearch);
}


