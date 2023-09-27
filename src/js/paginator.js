// export const BASE_URL = "https://drinkify.b.goit.study/api/v1/cocktails/";
const BASE_URL = "https://drinkify.b.goit.study/api/v1/cocktails/";
const searchWord = document.querySelector(".input");
const container = document.querySelector(".cocktails");
// const getImages = async (data, page) => {
//     // toggleLoader(loader, "show");
//     const listImg = await makeRequest(data, page);

//     if (listImg) {
//       // console.log("listImg", listImg);
      
//         if (listImg.totalHits === 0 ) {
//           errorMsg();
//           return;
//         }
//         renderImages(listImg.hits);
//          return listImg.totalHits;
//         // toggleLoader(loader, "hide");
//         // return listImg;
//       }
// }

// function renderImages(images) {
   
//     const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card"><a class="gallery__link" href=${largeImageURL}>
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
//         <div class="info"><p class="info-item"><b>Likes: ${likes}</b></p><p class="info-item">
//         <b>Views: ${views}</b></p><p class="info-item"><b>Comments: ${comments}</b></p>
//           <p class="info-item"><b>Downlosds: ${downloads}</b></p></div></div>`)
//         .join("");
   
//     galleryEl.insertAdjacentHTML('beforeend', markup);
// }
// userForm.addEventListener("submit", searchInfoCallback);
// export const makeRequest = async (data, page) => {
      
//     const searchParams = new URLSearchParams({
//         key: API_KEY,
//         q: data.searchQuery,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: "true",
//         per_page: 40,
//         page,
//       });
//       const endpoint = BASE_URL + "?" + searchParams.toString();
  
//    return axios.get(`${BASE_URL}?${searchParams.toString()}`)
//       .then((res) => {
//         if (res.status === 200 && res.data.total != 0) {
//                   return res.data;
//                 }
        
//         throw new Error(res.statusText);
//       })
//       .then((res) => {
//               loadMoreEl.classList.replace("load-more-hidden", "load-more");
//               console.log(page * res.hits.length);
//               if ((page * res.hits.length) >= res.totalHits) {
//                 loadMoreEl.classList.replace("load-more", "load-more-hidden");
//                 infoMsg();
//               }
//               return res;
//             })
//       .catch((err) => {
//           galleryEl.innerHTML = '';
//           loadMoreEl.classList.replace("load-more", "load-more-hidden");
//           errorMsg()
//           return
//       })
//   //     .finally(function () {
//   //       console.log("finally");
//   //       return 
//   // });
//   };
// function errorMsg() {
//   Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
//     position: 'center-center',
//     timeout: 5000,
//     width: '400px',
//     fontSize: '24px'});
// }

// function infoMsg() {
//   Notify.failure("We are sorry, but you've reached the end of search results.", {
//     position: 'center-center',
//     timeout: 5000,
//     width: '400px',
//     fontSize: '24px'});
// }