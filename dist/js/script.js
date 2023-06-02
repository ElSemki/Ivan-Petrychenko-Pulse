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
    const list = document.querySelectorAll('.catalog-item__list-wrapper');
    targets.forEach((target, i) => {
      target.addEventListener('click', (e) => {
        e.preventDefault();
        catalog[i].classList.toggle('catalog-item__content--active');
        list[i].classList.toggle('catalog-item__list-wrapper--active');
      });
    });
  }

  toggleCardBody('.catalog-item__link');
  toggleCardBody('.catalog-item__back');

  // Modal
  const overlay = document.querySelector('.overlay');
  const modalConsult = document.querySelector('#consultation');
  const modalOrder = document.querySelector('#order');
  const modalThanks = document.querySelector('#thanks');
  const modalError = document.querySelector('#error');
  const modalTriggerConsult = document.querySelectorAll(
    '[data-modal="consultation"]'
  );
  const modalTriggerOrder = document.querySelectorAll('.catalog-item__button');

  function openModal(modal) {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    modal.classList.add('fadeIn');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalConsult.style.display = 'none';
    modalOrder.style.display = 'none';
    modalThanks.style.display = 'none';
    modalError.style.display = 'none';
    overlay.style.display = 'none';
    modalConsult.classList.remove('fadeIn');
    modalOrder.classList.remove('fadeIn');
    modalThanks.classList.remove('fadeIn');
    modalError.classList.remove('fadeIn');
    document.body.style.overflow = '';
  }

  function modalFn() {
    const modalDesc = modalOrder.querySelector('.modal__desc');
    const cardSubtitle = document.querySelectorAll('.catalog-item__subtitle');

    function modal() {
      modalTriggerConsult.forEach((btn) => {
        btn.addEventListener('click', () => openModal(modalConsult));
      });

      modalTriggerOrder.forEach((button, i) => {
        button.addEventListener('click', () => {
          modalDesc.textContent = cardSubtitle[i].textContent;
          openModal(modalOrder);
        });
      });

      overlay.addEventListener('click', (evt) => {
        if (
          evt.target === overlay ||
          evt.target.className === 'modal__close' ||
          evt.target.className === 'button button--mobile'
        ) {
          closeModal();
        }
      });

      document.addEventListener('keydown', (evt) => {
        if (
          evt.code === 'Escape' &&
          window.getComputedStyle(overlay).display === 'block'
        ) {
          closeModal();
        }
      });
    }

    modal();
  }

  modalFn();

  // Forms
  function form() {
    const forms = document.querySelectorAll('.feed-form');
    forms.forEach((form) => {
      const username = form.querySelector('#name');
      const phone = form.querySelector('#phone');
      const email = form.querySelector('#email');

      form.addEventListener('submit', formSend);

      async function formSend(e) {
        e.preventDefault();

        let error = checkInputs();

        let formData = new FormData(form);

        if (error === 0) {
          form.classList.add('_sending');
          let response = await fetch('mailer/smart.php', {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            form.classList.remove('_sending');
            // let result = await response.text();
            closeModal();
            openModal(modalThanks);
            setTimeout(closeModal, 6000);
            form.reset();
          } else {
            closeModal();
            openModal(modalError);
            form.classList.remove('_sending');
          }
        }
      }

      function checkInputs() {
        const usernameValue = username.value.trim();
        const phoneValue = phone.value.trim();
        const emailValue = email.value.trim();

        let error = 0;

        if (usernameValue === '') {
          setErrorFor(username, 'Имя пользователя пустое');
          error++;
        } else {
          setSuccessFor(username);
        }

        if (phoneValue === '') {
          setErrorFor(phone, 'Телефон не может быть пустым');
          error++;
        } else if (phoneValue.length < 18) {
          setErrorFor(phone, 'Телефон введен не верно');
          error++;
        } else {
          setSuccessFor(phone);
        }

        if (emailValue === '') {
          setErrorFor(email, 'E-mail не может быть пустым');
          error++;
        } else if (!isEmail(emailValue)) {
          setErrorFor(email, 'E-mail не действителен');
          error++;
        } else {
          setSuccessFor(email);
        }

        return error;
      }

      function setErrorFor(input, message) {
        const inputControl = input.parentElement;
        const small = inputControl.querySelector('small');
        small.innerText = message;
        inputControl.className = 'input-control error';
      }

      function setSuccessFor(input) {
        const inputControl = input.parentElement;
        inputControl.className = 'input-control success';
      }

      function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        );
      }
    });
  }

  form();

  // Маска для телефона
  function mask(selector) {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };

    function createMask(event) {
      let matrix = '+7 (___) ___ __ __';
      let i = 0;
      let def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : a;
      });
      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  mask('[name="phone"]');

  // Scroll and page up
  function scrolling() {
    const upElem = document.querySelector('.page-up');
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 1000) {
        upElem.classList.add('fadeIn');
        upElem.classList.remove('fadeOut');
        upElem.style.display = 'block';
      } else {
        upElem.classList.add('fadeOut');
        upElem.classList.remove('fadeIn');
        upElem.style.display = 'none';
      }
    });

    let links = document.querySelectorAll('[href^="#up"]');
    let speed = 0.3;

    links.forEach((link) => {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();

        let widthTop = document.documentElement.scrollTop;
        let hash = this.hash;
        let toBlock = document.querySelector(hash).getBoundingClientRect().top;
        let start = null;

        requestAnimationFrame(step);

        function step(time) {
          if (start === null) {
            start = time;
          }

          let progress = time - start;
          let r =
            toBlock < 0
              ? Math.max(widthTop - progress / speed, widthTop + toBlock)
              : Math.min(widthTop + progress / speed, widthTop + toBlock);

          document.documentElement.scrollTo(0, r);

          if (r !== widthTop + toBlock) {
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
        }
      });
    });
  }

  scrolling();
});
