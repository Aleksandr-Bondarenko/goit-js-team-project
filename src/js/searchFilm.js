import { galleryContainer, searchForm, notification, inputEl } from './refs.js';
import { cardsMarkUp } from './cards-mark-up';
import ApiService from './apiService';
import Pagination from 'tui-pagination';
import { options } from './pagination';
import currentMovies from './currentMovies.js';
import { target, spinner } from './spinner.js';

const debounce = require('lodash.debounce');

const pagination = new Pagination('#tui-pagination-container', options);
const apiService = new ApiService();

searchForm.addEventListener('submit', searchMovie);
inputEl.addEventListener('input', debounce(searchMovie, 350));

let inputFilm = '';

function searchMovie(event) {
  spinner.spin(target);
  // let inputFilm = '';
  event.preventDefault();
  const inputValue = inputEl.value;
  inputFilm = inputValue.replace(/\s+/g, ' ').trim();

  if (inputFilm.length === 0) {
    apiService.fetchTrending(1).then((res) => {
      resetSearch();
      cardsMarkUp(res.results);
      pagination.reset(res.total_pages);
      spinner.stop();
    });
    return;
  }
  apiService.query = inputFilm;

  if (inputFilm) {
    notification.textContent = '';
    apiService.fetchMovies(1).then((res) => {
      if (res.total_results === 0) {
        spinner.stop();
        notification.textContent = `No results were found for "${inputFilm}".`;
        // inputEl.value = '';
        setTimeout(() => (notification.textContent = ''), 5000);
        return;
      }
      resetSearch();
      pagination.reset(res.total_pages);
      cardsMarkUp(res.results);
    });
  }
  // inputText.value = '';
  setTimeout(() => spinner.stop(), 400);
}

pagination.on('afterMove', (e) => {
  window.scrollTo(scrollX, 0);
  const currentPage = e.page;
  setTimeout(() => {
    resetSearch();
    inputFilm
      ? apiService.fetchMovies(currentPage).then((res) => {
          cardsMarkUp(res.results);
          currentMovies.movies = res.results;
        })
      : apiService.fetchTrending(currentPage).then((res) => {
          cardsMarkUp(res.results);
          currentMovies.movies = res.results;
          setTimeout(() => spinner.stop(), 1000);
        });
  }, 650);
});

function resetSearch() {
  galleryContainer.innerHTML = '';
}
