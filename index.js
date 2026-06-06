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

document.addEventListener('DOMContentLoaded', () => {
  // On cible les éléments ayant la classe .btn OU .skills__skill
  const interactiveElements = document.querySelectorAll('.btn, .skills__skill');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      // Génère la teinte
      const randomHue = Math.floor(Math.random() * 360);
      
      // Applique la couleur de fond
      this.style.setProperty('background-color', `hsl(${randomHue}, 100%, 50%)`, 'important');
      
      // Adapte la couleur du texte
      let textLightness = (randomHue >= 40 && randomHue <= 190) ? 15 : 92;
      this.style.setProperty('color', `hsl(${randomHue}, 100%, ${textLightness}%)`, 'important');
    });

    element.addEventListener('mouseleave', function() {
      // Retire les couleurs pour revenir au style de base
      this.style.removeProperty('background-color');
      this.style.removeProperty('color');
    });
  });
});

// --- EFFET HOVER AVEC SAUT ET COULEUR SUR LES LIENS DU MENU ---
const menuLinks = document.querySelectorAll('.header__link');

menuLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    // 1. Génère une teinte aléatoire entre 0 et 360 degrés
    const randomHue = Math.floor(Math.random() * 360);
    
    // 2. Ajuste la luminosité pour garantir la lisibilité sur fond blanc
    // Si la teinte est entre 40 (orange/jaune) et 190 (vert/cyan), on baisse la luminosité à 32%
    // Sinon (bleu, violet, rouge), on la laisse à 45% pour un effet très électrique
    const lightness = (randomHue >= 40 && randomHue <= 190) ? 32 : 45;
    
    // 3. Applique la couleur vive au texte
    this.style.setProperty('color', `hsl(${randomHue}, 100%, ${lightness}%)`, 'important');
    
    // 4. Fait faire le petit saut vers le haut (5 pixels)
    this.style.setProperty('transform', 'translateY(-1.5px)', 'important');
  });

  // Quand la souris quitte le lien
  link.addEventListener('mouseleave', function() {
    // On efface les styles temporaires pour revenir à l'état initial
    this.style.removeProperty('color');
    this.style.removeProperty('transform');
  });
});