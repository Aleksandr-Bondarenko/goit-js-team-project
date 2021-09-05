import { homeBtnEl, logoEl, libBtnEl, headerEl, searchForm } from './refs.js';
import { renderMainPageOnClick, renderInputOnClick } from './homeBtnRenderPage';

export const renderLibHeaderOnClick = () => {
  libBtnEl.classList.add('nav-menu__btn_active');
  homeBtnEl.classList.add('nav-menu__btn_hover');
  homeBtnEl.classList.remove('nav-menu__btn_active');
  headerEl.classList.replace('header__main-bg-js', 'header__lib-bg-js');
  searchForm.classList.remove('input-wrap_searchIcon');

  const markUp =
    '<div class="header__btn-box"><button class="header__watch-btn" type="button">Watched</button><button class="header__queue-btn" type="button">queue</button></div>';
  searchForm.innerHTML = markUp;

  libBtnEl.removeEventListener('click', renderLibHeaderOnClick);

  homeBtnEl.addEventListener('click', renderMainPageOnClick);
  logoEl.addEventListener('click', renderMainPageOnClick);
  homeBtnEl.addEventListener('click', renderInputOnClick);
  logoEl.addEventListener('click', renderInputOnClick);

  changeBgcLibBtn();
};

const changeBgcLibBtn = () => {
  const watchBtnEl = document.querySelector('.header__watch-btn');
  const queueBtnEl = document.querySelector('.header__queue-btn');

  const onWatchClick = () => {
    watchBtnEl.classList.add('header__watch-btn_active');
    queueBtnEl.classList.remove('header__queue-btn_active');
    watchBtnEl.removeEventListener('click', onWatchClick);
    queueBtnEl.addEventListener('click', onQueueClick);
  };

  const onQueueClick = () => {
    queueBtnEl.classList.add('header__queue-btn_active');
    watchBtnEl.classList.remove('header__watch-btn_active');
    watchBtnEl.addEventListener('click', onWatchClick);
    queueBtnEl.removeEventListener('click', onQueueClick);
  };

  watchBtnEl.addEventListener('click', onWatchClick);
  queueBtnEl.addEventListener('click', onQueueClick);
};

libBtnEl.addEventListener('click', renderLibHeaderOnClick);