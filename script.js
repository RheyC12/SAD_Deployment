const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");

  // When navigation is opened, insert logo and title
  const logoContainer = document.createElement('div');
  logoContainer.classList.add('logoContainer');

  const logoImg = document.createElement('img');
  logoImg.src = 'LOGO.png'; // Add your logo image path
  logoImg.alt = 'Logo';

  const logoTitle = document.createElement('div');
  logoTitle.textContent = 'SK Digital Platform';
  logoTitle.classList.add('navTitle');

  logoContainer.appendChild(logoImg);
  logoContainer.appendChild(logoTitle);

  const navLinks = document.querySelector('.nav-links');
  if (navLinks.querySelector('.logoContainer') === null) { // Check if the logo container is already added
    navLinks.insertBefore(logoContainer, navLinks.firstChild);
  }
});

navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});



var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
      0: {
          slidesPerView: 1,
      },
      520: {
          slidesPerView: 2,
      },
      950: {
          slidesPerView: 3,
      },
  },
});


