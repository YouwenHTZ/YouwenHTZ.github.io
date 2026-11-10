/* ==========================================================================
   SCRIPT GÉNÉRAL
   - fait apparaître les blocs quand ils arrivent à l'écran
   - copie l'adresse e-mail dans le presse-papiers
   Ce fichier ne fait qu'ajouter ou retirer des classes CSS.
   ========================================================================== */


/* ---------- Réglages : à modifier ici ---------- */

const CLASSE_JS_ACTIF = "js-actif";
const CLASSE_VISIBLE = "est-visible";
const SELECTEUR_BLOCS_A_REVELER = ".a-reveler";

// Part du bloc qui doit être visible avant de le faire apparaître (0.15 = 15 %)
const SEUIL_APPARITION = 0.15;

const TEXTE_ADRESSE_COPIEE = "Adresse copiée ✓";
const DUREE_MESSAGE_COPIE = 2000; // en millisecondes


/* ---------- Apparition des blocs au défilement ---------- */

function revelerBlocsVisibles(entrees, observateur) {
  entrees.forEach(function (entree) {
    if (entree.isIntersecting) {
      entree.target.classList.add(CLASSE_VISIBLE);
      // Une fois affiché, le bloc n'a plus besoin d'être surveillé
      observateur.unobserve(entree.target);
    }
  });
}

function activerApparitionDesBlocs() {
  const observateur = new IntersectionObserver(revelerBlocsVisibles, {
    threshold: SEUIL_APPARITION
  });

  // Cette classe indique au CSS que le JavaScript fonctionne
  document.documentElement.classList.add(CLASSE_JS_ACTIF);

  document.querySelectorAll(SELECTEUR_BLOCS_A_REVELER).forEach(function (bloc) {
    observateur.observe(bloc);
  });
}


/* ---------- Copie de l'adresse e-mail ---------- */

function afficherConfirmationCopie(bouton) {
  const texteInitial = bouton.textContent;

  bouton.textContent = TEXTE_ADRESSE_COPIEE;
  setTimeout(function () {
    bouton.textContent = texteInitial;
  }, DUREE_MESSAGE_COPIE);
}

function copierAdresse(evenement) {
  const bouton = evenement.currentTarget;

  navigator.clipboard.writeText(bouton.dataset.adresse).then(function () {
    afficherConfirmationCopie(bouton);
  });
}

function activerCopieAdresse() {
  const bouton = document.getElementById("bouton-copier-adresse");

  if (bouton !== null && navigator.clipboard !== undefined) {
    bouton.addEventListener("click", copierAdresse);
  }
}


/* ---------- Démarrage ---------- */

activerApparitionDesBlocs();
activerCopieAdresse();
