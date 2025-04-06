const menuButton = document.querySelector('.main-nav__toggle');
const navigationList = document.querySelector('.main-nav__list');

const onMenuButtonClick = () => {
  menuButton.classList.toggle('main-nav__toggle--open');
  navigationList.classList.toggle('main-nav__list--open');
}

const loadJavaScript = () => {
  const nojs = document.querySelector('.nojs');
  const nojsMap = document.querySelector('.nojs__map');
  const map = document.querySelector('.map');

  nojs.classList.remove('nojs');
  if (map && nojsMap) {
    nojsMap.remove();
    map.style.display = 'block';
  }
};

loadJavaScript();
menuButton.addEventListener('click', onMenuButtonClick);
