// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// --- ANIMATION DES SECTIONS (SLIDE UP) ---
// On sélectionne toutes les sections à animer
const sectionsToReveal = document.querySelectorAll('.about, .projects, .contact, .main-footer');

// On crée l'observateur
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Si la section entre dans l'écran
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-up-active');
    } else {
      // Retire la classe quand on quitte la section pour rejouer l'animation au prochain passage
      entry.target.classList.remove('slide-up-active');
    }
  });
}, { 
  threshold: 0.15
});

// On applique l'observateur à chaque section trouvée
sectionsToReveal.forEach(section => {
  sectionObserver.observe(section);
});