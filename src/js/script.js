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
