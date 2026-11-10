// =====================================================
// Apparition des éléments au défilement + compteurs animés
// =====================================================

// Durée de l'animation des chiffres clés, en millisecondes
const DUREE_COMPTEUR = 1200;

// Nombre de décalages différents (classes .reveal--delai-1 à 3 du CSS)
const NOMBRE_DE_DELAIS = 4;

const animationsReduites = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fait monter un chiffre de 0 jusqu'à la valeur de data-count
function animerCompteur(element) {
  const valeurFinale = Number(element.dataset.count);

  if (animationsReduites) {
    element.textContent = valeurFinale;
    return;
  }

  const debut = performance.now();

  function etape(maintenant) {
    const progression = Math.min((maintenant - debut) / DUREE_COMPTEUR, 1);
    // Ralentit en fin de course
    const progressionAdoucie = 1 - Math.pow(1 - progression, 3);
    element.textContent = Math.round(valeurFinale * progressionAdoucie);
    if (progression < 1) {
      requestAnimationFrame(etape);
    }
  }

  requestAnimationFrame(etape);
}

// Décale légèrement les éléments voisins pour un effet en cascade
function ajouterDelai(element) {
  const voisins = Array.from(element.parentElement.children).filter(function (voisin) {
    return voisin.classList.contains('reveal');
  });
  const rang = voisins.indexOf(element) % NOMBRE_DE_DELAIS;
  if (rang > 0) {
    element.classList.add('reveal--delai-' + rang);
  }
}

// Rend un élément visible et lance ses compteurs
function reveler(element) {
  element.classList.add('visible');
  element.querySelectorAll('[data-count]').forEach(animerCompteur);
}

// Révèle chaque élément .reveal quand il entre dans l'écran
function activerApparitions() {
  const observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        reveler(entree.target);
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (element) {
    ajouterDelai(element);
    observateur.observe(element);
  });
}

activerApparitions();
