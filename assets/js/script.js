"use strict";

//? ======= PRELOADING =========

//? loading will be end after document is loaded

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

//? add event listener on multipul elements

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};



//? NAVBAR

// اختيار العناصر الضرورية
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const links = document.querySelectorAll('a[href^="#"]'); // الروابط التي تشير إلى أقسام داخل الصفحة

// دالة للتبديل بين حالة القائمة النشطة
const toggleNavbar = function () {
  // التأكد من عدم تعليق الفئات
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");

  if (navbar.classList.contains("active")) {
    document.body.classList.add("nav-active");
  } else {
    document.body.classList.remove("nav-active");
  }
};

// إضافة حدث النقر على الزر لتبديل القائمة
navTogglers.forEach(toggler => {
  toggler.addEventListener("click", toggleNavbar);
});

// دالة لإغلاق القائمة والـ overlay إذا كانت مفتوحة
const closeNavbarIfOpen = function() {
  if (navbar.classList.contains("active")) {
    // إغلاق القائمة والـ overlay
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  }
};

// إضافة أحداث النقر على الروابط لمنع إعادة تحميل الصفحة والتمرير إلى القسم المطلوب
links.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const targetId = link.getAttribute('href'); // الحصول على القسم المطلوب
    const targetElement = document.querySelector(targetId); // العنصر الذي يجب التمرير إليه

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop, // التمرير إلى القسم المطلوب
        behavior: 'smooth' // تمرير سلس
      });

      // إغلاق القائمة بعد التنقل إلى القسم المطلوب
      closeNavbarIfOpen();
    }
  });
});

// إضافة حدث النقر خارج القائمة لإغلاقها
overlay.addEventListener('click', closeNavbarIfOpen);


//? header & back top btn
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

//? slide

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

//? auto slide

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  }
);

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

//? PARALLAX EFFECT

const parallaxItem = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  //todo reverse the number eg. 20 --> -20 , -5 --> 5

  x = x - (x * 2);
  y = y - (y * 2);


  for(let i = 0, len = parallaxItem.length; i < len; i++){
     x = x * Number(parallaxItem[i].dataset.parallaxSpeed); 
     y = y * Number(parallaxItem[i].dataset.parallaxSpeed);
     parallaxItem[i].style.transform = `translate3d(${x}px , ${y}px, 0px)`; 
  }
});

