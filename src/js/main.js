window.addEventListener('DOMContentLoaded', () => {

  const toFormBtn = document.querySelector('.banner__btn');
  const form = document.querySelector('.form');
  const main = document.querySelector('.main');
  toFormBtn.addEventListener('click', () => {
    form.classList.remove('inv');
    main.classList.add('inv');
    $('.fade').slick('unslick');
  });

  const toMainBtn = document.querySelector('.form__back-btn');
  toMainBtn.addEventListener('click', () => {
    form.classList.add('inv');
    main.classList.remove('inv');
    sliderStart();
  });
  
  const sliderStart = () => {
    $('.fade').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      autoplay: true,
      autoplaySpeed: 3500,
      arrows: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      cssEase: 'linear'
    });
  }
  sliderStart();

  const setCursorPosition = (pos, elem) => {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select()
    }
  }

  const mask = (event) => {
    let matrix = '+7 (___) ___ ____',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = input.value.replace(/\D/g, '');
    if (def.length >= val.length) val = def;
    input.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    if (event.type == 'blur') {
    if (input.value.length == 2) input.value = ''
    } else setCursorPosition(input.value.length, input)
  };

  const input = document.querySelector('#user-tel');
  input.addEventListener('input', mask, false);
  input.addEventListener('focus', mask, false);
  input.addEventListener('blur', mask, false);

  const allInpts = document.querySelectorAll('.form__input');
  allInpts.forEach(inp => {
    inp.addEventListener('focus', () => {
      inp.parentElement.classList.add('not-empty');
    });
  });

  const allInptsOut = document.querySelectorAll('body .form__input');
  allInptsOut.forEach(inpOut => {
    inpOut.addEventListener('focusout', () => {
      if (inpOut.value.length === 0) {
        inpOut.parentElement.classList.remove('not-empty');
      }
    });
  });

  const citySpoiler = document.querySelector('.spoiler');
  citySpoiler.addEventListener('click', () => {
    citySpoiler.nextElementSibling.classList.toggle('spoiler__content-show');
    citySpoiler.parentElement.classList.toggle('not-empty');
  });

  document.addEventListener('mousedown', event => {
    if(event.target.closest('.form__city') === null) {
      citySpoiler.parentElement.classList.remove('not-empty');
      citySpoiler.nextElementSibling.classList.remove('spoiler__content-show');
    }
  });

  const citySelect = document.querySelectorAll('.spoiler__link');
  citySelect.forEach((city) => {
    city.addEventListener('click', () => {
      citySpoiler.innerHTML = city.innerHTML;
      citySpoiler.parentElement.classList.remove('not-empty');
      citySpoiler.nextElementSibling.classList.remove('spoiler__content-show');
    });
  });

});
