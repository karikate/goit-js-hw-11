import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import { fetchPhoto } from './pix-api';
import { createMarkup } from "./create-markup";
import { perPage } from "./pix-api";
const formEl = document.querySelector('.search-form');
const inputEl = formEl.firstElementChild;
const galleruEl = document.querySelector('.gallery');
const targetEl = document.querySelector('.js-guard');

let searchParam = '';
let currentPage = null;
let limit = perPage;

let options = {
  root: null,
  rootMargin: "300px",
  threshold: 1.0,
};
let observer = new IntersectionObserver(onLoad, options);


formEl.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();
  galleruEl.innerHTML = '';
  searchParam = encodeURIComponent(inputEl.value);
currentPage = 1;
  fetchPhoto(searchParam, currentPage)
    .then(photos => {
      const totalHits = photos.totalHits;
      if (totalHits >0 ) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }
            const photoMarkup = createMarkup(photos.hits);
      galleruEl.insertAdjacentHTML('beforeend', photoMarkup);
      observer.observe(targetEl);
      if (!photos.hits.length) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      lightbox.refresh();
    })
    .catch(err => console.log(err),
    )
    .finally(formEl.reset());
      
}

function onLoad(entries, observe){
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      currentPage+=1;
    fetchPhoto(searchParam, currentPage)
    .then(photos => {
      const totalHits = photos.totalHits;
      const photoMarkup = createMarkup(photos.hits);
      galleruEl.insertAdjacentHTML('beforeend', photoMarkup);
      lightbox.refresh();
      if ((currentPage * limit) > photos.totalHits) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        observer.unobserve(targetEl);
      }
    })
    .catch(err => console.log(err))
      }
  
})
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

