/* ==========================================================================
   BARRE DE NAVIGATION
   - ouvre et ferme le menu sur petit écran
   - met en avant le lien de la section affichée à l'écran
   Ce fichier ne fait qu'ajouter ou retirer des classes CSS.
   ========================================================================== */


/* ---------- Réglages : à modifier ici ---------- */

const CLASSE_MENU_OUVERT = "menu--ouvert";
const CLASSE_BOUTON_OUVERT = "entete__bouton-menu--ouvert";
const CLASSE_LIEN_ACTIF = "menu__lien--actif";

// Une section devient « active » quand elle traverse le milieu de l'écran
const ZONE_DE_DETECTION = "-45% 0px -55% 0px";


/* ---------- Éléments de la page ---------- */

const boutonMenu = document.getElementById("bouton-menu");
const menu = document.getElementById("menu-principal");
const liensDuMenu = document.querySelectorAll(".menu__lien");


/* ---------- Ouverture et fermeture du menu ---------- */

function fermerMenu() {
  menu.classList.remove(CLASSE_MENU_OUVERT);
  boutonMenu.classList.remove(CLASSE_BOUTON_OUVERT);
  boutonMenu.setAttribute("aria-expanded", "false");
}

function basculerMenu() {
  const estOuvert = menu.classList.toggle(CLASSE_MENU_OUVERT);
  boutonMenu.classList.toggle(CLASSE_BOUTON_OUVERT, estOuvert);
  boutonMenu.setAttribute("aria-expanded", String(estOuvert));
}

function fermerMenuAvecEchap(evenement) {
  if (evenement.key === "Escape") {
    fermerMenu();
  }
}

function activerMenuMobile() {
  boutonMenu.addEventListener("click", basculerMenu);
  document.addEventListener("keydown", fermerMenuAvecEchap);

  // Le menu se referme quand on choisit une rubrique
  liensDuMenu.forEach(function (lien) {
    lien.addEventListener("click", fermerMenu);
  });
}


/* ---------- Lien actif selon la section affichée ---------- */

function marquerLienActif(identifiantSection) {
  liensDuMenu.forEach(function (lien) {
    const estActif = lien.getAttribute("href") === "#" + identifiantSection;
    lien.classList.toggle(CLASSE_LIEN_ACTIF, estActif);
  });
}

function traiterSectionsVisibles(entrees) {
  entrees.forEach(function (entree) {
    if (entree.isIntersecting) {
      marquerLienActif(entree.target.id);
    }
  });
}

function suivreSectionAffichee() {
  const observateur = new IntersectionObserver(traiterSectionsVisibles, {
    rootMargin: ZONE_DE_DETECTION
  });

  document.querySelectorAll("main section[id]").forEach(function (section) {
    observateur.observe(section);
  });
}


/* ---------- Démarrage ---------- */

if (boutonMenu !== null && menu !== null) {
  activerMenuMobile();
  suivreSectionAffichee();
}
