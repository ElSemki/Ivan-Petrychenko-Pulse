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

$(document).ready(function () {
  $('ul.catalog__tabs').on(
    'click',
    'li:not(.catalog__tab--active)',
    function () {
      $(this)
        .addClass('catalog__tab--active')
        .siblings()
        .removeClass('catalog__tab--active')
        .closest('div.container')
        .find('div.catalog__content')
        .removeClass('catalog__content--active')
        .eq($(this).index())
        .addClass('catalog__content--active');
    }
  );

  function toggleSlide(className) {
    $(className).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content')
          .eq(i)
          .toggleClass('catalog-item__content--active');
        $('.catalog-item__list')
          .eq(i)
          .toggleClass('catalog-item__list--active');
      });
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');
});
