"use strict";
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});;
let pageSlider = new Swiper(".page", {
  //Кастомні класи
  wrapperClass: "page__wrapper",
  slideClass: "page__screen",

  direction: "vertical",

  slidesPerView: "auto",

  parallax: true,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  mousewheel: {
    sensitivity: 1,
  },
  watchOverflow: true,

  speed: 800,

  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  pagination: {
    el: ".page__pagination",
    type: "bullets",
    clickable: true,
    bulletClass: "page__bullet",
    bulletActiveClass: "page__bullet_active",
  },
  scrollbar: {
    el: ".page__scroll",
    dragClass: "page__drag-scroll",
    draggable: true,
  },
  hashNavigation: {
    watchState: true,
  },

  init: false,

  //Івенти
  on: {
    init: function () {
      setScrollType();
      header.classList.remove("_hidden");
      pagination.classList.remove("_hidden");
      menuSlider();
    },

    slideChange: function () {
      menuSliderRemove();
      menuLinks[pageSlider.realIndex].classList.add("_active");
    },

    resize: function () {
      setScrollType();
    },
  },
});

let header = document.querySelector("header.header");
let pagination = document.querySelector(".page__pagination");
let menuLinks = document.querySelectorAll(".menu__link");
let wrapper = document.querySelector(".wrapper");

function menuSlider() {
  if (menuLinks) {
    menuLinks[pageSlider.realIndex].classList.add("_active");
    for (let i = 0; i < menuLinks.length; i++) {
      const menuLink = menuLinks[i];
      menuLink.addEventListener("click", function (e) {
        e.preventDefault();
        pageSlider.slideTo(i, 800);
      });
    }
  }
}
function menuSliderRemove() {
  let menuLinkActive = document.querySelector(".menu__link._active");
  if (menuLinkActive) {
    menuLinkActive.classList.remove("_active");
  }
}

//Перевірка чи контент поміщається у слайди
function setScrollType() {
  if (wrapper.classList.contains("_free")) {
    wrapper.classList.remove("_free");
    pageSlider.params.freeMode = false;
  }
  for (let i = 0; i < pageSlider.slides.length; i++) {
    const pageSlide = pageSlider.slides[i];
    const pageSlideContent = pageSlide.querySelector(
      ".page__screen .page__content"
    );
    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight;
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add("_free");
        pageSlider.params.freeMode = true; //Ціль
        break;
      }
    }
  }
}

pageSlider.init();

//Слайдер для портфоліо

let portfolioSlider = new Swiper(".prt-slider", {
  wrapperClass: "prt-slider__wrapper",
  slideClass: "prt-slide",

  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  // spaceBetween: 110,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});
