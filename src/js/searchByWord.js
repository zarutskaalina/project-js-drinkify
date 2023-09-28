// export const BASE_URL = "https://drinkify.b.goit.study/api/v1/cocktails/";
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "https://drinkify.b.goit.study/api/v1/cocktails/";
const searchWord = document.querySelector('input');
const button = document.querySelector(".searching-button");
const searchForm = document.querySelector(".search-form");
const resultsContainer = document.querySelector(".searching-results");
const emptySearch = document.querySelector(".empty-search");


const getImages = async (data) => {
    // toggleLoader(loader, "show");
    const listImg = await makeRequest(data);

    if (listImg) {
        console.log("listImg", listImg.length);
      
        if (listImg.length === 0) {
            emptySearch.style.display = 'block';
            return;
        }
    }
        renderImages(listImg);
        //  return listImg.totalHits;
    //     // toggleLoader(loader, "hide");
    //     // return listImg;
    //   }
}

const searchInfoCallback = async (e) => {
  e.preventDefault();
//   resultsContainer.innerHTML = '';
//   loadMoreEl.classList.replace("load-more", "load-more-hidden");
//     let page = 1;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("data", data);
    if (data.searchQuery.trim() === "") {
        return Notify.failure("Please write the word in the field!");
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
   
    const markup = images.map(({ drink, description, drinkThumb}) => `<div class="photo-card"> <h2>${drink}</h2>
        <img src="${drinkThumb}" alt="${drink}" loading="lazy" />
        <div class="info"><p class="info-item"> ${description}</p></div></div>`)
        .join("");
   
    resultsContainer.innerHTML = markup;
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
    emptySearch.classList.replace("empty-search-toggle", "empty-search-hidden");
    console.log(emptySearch);
}
