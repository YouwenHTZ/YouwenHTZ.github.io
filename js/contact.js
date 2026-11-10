// =====================================================
// Contact : copie de l'adresse e-mail + année du pied de page
// =====================================================

// Textes affichés à côté de l'adresse e-mail
const TEXTE_COPIER = 'copier';
const TEXTE_COPIE = 'copié ✓';
const TEXTE_ECHEC = 'sélectionnez le texte';

// Temps avant de réafficher « copier », en millisecondes
const DUREE_MESSAGE = 2000;

const boutonCopier = document.querySelector('.copy');
const messageCopier = boutonCopier.querySelector('.copy__hint');

// Copie l'adresse (attribut data-email) dans le presse-papiers
async function copierEmail() {
  try {
    await navigator.clipboard.writeText(boutonCopier.dataset.email);
    messageCopier.textContent = TEXTE_COPIE;
  } catch (erreur) {
    messageCopier.textContent = TEXTE_ECHEC;
  }

  setTimeout(function () {
    messageCopier.textContent = TEXTE_COPIER;
  }, DUREE_MESSAGE);
}

// Affiche l'année en cours dans le pied de page
function afficherAnnee() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

boutonCopier.addEventListener('click', copierEmail);
afficherAnnee();
