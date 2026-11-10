// =====================================================
// Barre de navigation : fond au défilement, menu mobile,
// et mise en avant du lien de la section affichée
// =====================================================

// Nombre de pixels défilés avant que la barre prenne un fond
const SEUIL_DEFILEMENT = 40;

const entete = document.querySelector('.header');
const boutonMenu = document.querySelector('.burger');
const liensMenu = document.querySelectorAll('.menu__link');

// Ajoute un fond à la barre dès qu'on quitte le haut de la page
function mettreAJourFondEntete() {
  entete.classList.toggle('scrolled', window.scrollY > SEUIL_DEFILEMENT);
}

// Ouvre ou ferme le menu mobile
function reglerMenuMobile(ouvert) {
  entete.classList.toggle('open', ouvert);
  boutonMenu.setAttribute('aria-expanded', ouvert);
  boutonMenu.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
}

function basculerMenuMobile() {
  reglerMenuMobile(!entete.classList.contains('open'));
}

function fermerMenuMobile() {
  reglerMenuMobile(false);
}

// Met en avant le lien qui correspond à la section visible
function activerLien(identifiantSection) {
  liensMenu.forEach(function (lien) {
    const estActif = lien.getAttribute('href') === '#' + identifiantSection;
    lien.classList.toggle('active', estActif);
  });
}

// Surveille quelle section passe au milieu de l'écran
function suivreSectionVisible() {
  const observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        activerLien(entree.target.id);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main > section[id]').forEach(function (section) {
    observateur.observe(section);
  });
}

mettreAJourFondEntete();
window.addEventListener('scroll', mettreAJourFondEntete, { passive: true });

boutonMenu.addEventListener('click', basculerMenuMobile);
document.querySelectorAll('.header a').forEach(function (lien) {
  lien.addEventListener('click', fermerMenuMobile);
});

suivreSectionVisible();
