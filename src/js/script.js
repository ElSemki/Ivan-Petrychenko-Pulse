window.addEventListener('DOMContentLoaded', () => {
  // Slider
  const slider = tns({
    container: '.carousel__list',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    navPosition: 'bottom',
    speed: 1200,
  });

  document
    .querySelector('.carousel__prev')
    .addEventListener('click', () => slider.goTo('prev'));

  document
    .querySelector('.carousel__next')
    .addEventListener('click', () => slider.goTo('next'));

  // Tabs
  function tabs() {
    const tabsWrapper = document.querySelector('.catalog__tabs');
    const tabItems = tabsWrapper.querySelectorAll('.catalog__tab');
    const tabContent = document.querySelectorAll('.catalog__content');

    function hideTabContent() {
      tabContent.forEach((item) => {
        item.classList.remove('catalog__content--active');
      });

      tabItems.forEach((item) => {
        item.classList.remove('catalog__tab--active');
      });
    }

    function showTabContent(i = 0) {
      tabContent[i].classList.add('catalog__content--active');
      tabItems[i].classList.add('catalog__tab--active');
    }

    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (e) => {
      let target = e.target;
      if (
        (target && target.classList.contains('catalog__tab')) ||
        target.parentNode.classList.contains('catalog__tab')
      ) {
        tabItems.forEach((item, i) => {
          if (target == item || target.parentNode == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });
  }

  tabs();

  // Card content toggle
  function toggleCardBody(className) {
    const targets = document.querySelectorAll(className);
    const catalog = document.querySelectorAll('.catalog-item__content');
    const list = document.querySelectorAll('.catalog-item__list');
    targets.forEach((target, i) => {
      target.addEventListener('click', (e) => {
        e.preventDefault();
        catalog[i].classList.toggle('catalog-item__content--active');
        list[i].classList.toggle('catalog-item__list--active');
      });
    });
  }

  toggleCardBody('.catalog-item__link');
  toggleCardBody('.catalog-item__back');
});
