/* ==========================================================================
   FOND DE L'ACCUEIL : lignes de code derrière le prénom et le nom
   Ce fichier crée les colonnes et les lignes.
   Le défilement lui-même est une animation CSS (voir css/accueil.css).
   ========================================================================== */


/* ---------- Réglages : à modifier ici ---------- */

// Lignes affichées en fond (une chaîne = une ligne)
const LIGNES_DE_CODE = [
  "#!/bin/bash",
  "# Mise à jour du serveur",
  "apt update && apt upgrade -y",
  "systemctl status apache2",
  "ufw allow 22/tcp",
  "ufw enable",
  "ssh admin@srv-fichiers",
  "ip a show eth0",
  "ping -c 4 192.168.10.254",
  "# Configuration du switch",
  "enable",
  "configure terminal",
  "vlan 10",
  " name ADMINISTRATION",
  "interface gigabitEthernet 0/1",
  " switchport mode access",
  " switchport access vlan 10",
  "interface vlan 10",
  " ip address 192.168.10.254 255.255.255.0",
  "access-list 101 permit tcp any any eq 443",
  "copy running-config startup-config",
  "# Active Directory",
  "Get-ADUser -Filter * | Select-Object Name",
  "New-ADUser -Name \"j.dupont\" -Enabled $true",
  "New-GPO -Name \"Securite-Postes\"",
  "Get-Service -Name wuauserv",
  "# Virtualisation avec Proxmox",
  "qm list",
  "qm start 101",
  "pct create 201 local:vztmpl/debian-12.tar.zst",
  "proxmox-backup-client backup root.pxar:/",
  "# RAID et stockage",
  "mdadm --create /dev/md0 --level=1 --raid-devices=2",
  "mkfs.ext4 /dev/md0",
  "mount /dev/md0 /srv/partage",
  "df -h",
  "# DHCP et DNS",
  "subnet 192.168.10.0 netmask 255.255.255.0 {",
  "  range 192.168.10.50 192.168.10.150;",
  "  option routers 192.168.10.254;",
  "}",
  "nslookup srv-web.lan",
  "dig +short srv-fichiers.lan",
  "# Base de données",
  "SELECT nom, prenom FROM utilisateurs;",
  "# Journaux et diagnostic",
  "tail -f /var/log/syslog",
  "journalctl -u ssh --since today",
  "tcpdump -i eth0 port 53",
  "# Sauvegarde automatique",
  "rsync -av /srv/partage/ /mnt/sauvegarde/",
  "crontab -e",
  "0 2 * * * /usr/local/bin/sauvegarde.sh",
  "echo \"Sauvegarde terminée\"",
  "exit 0"
];

// Nombre de colonnes créées (le CSS en masque deux sur petit écran)
const NOMBRE_DE_COLONNES = 4;

// Chaque colonne commence plus loin dans la liste, pour ne pas se ressembler
const DECALAGE_ENTRE_COLONNES = 14;


/* ---------- Fonctions ---------- */

// Choisit la couleur d'une ligne : commentaire, violette, bleue ou grise
function choisirClasseDeLigne(texte, position) {
  if (texte.trim().startsWith("#")) {
    return "ligne-code--commentaire";
  }
  if (position % 5 === 1) {
    return "ligne-code--violette";
  }
  if (position % 5 === 3) {
    return "ligne-code--bleue";
  }
  return "";
}

// Crée l'élément HTML d'une ligne de code
function creerLigne(texte, position) {
  const ligne = document.createElement("div");
  const classeCouleur = choisirClasseDeLigne(texte, position);

  ligne.className = "ligne-code";
  if (classeCouleur !== "") {
    ligne.classList.add(classeCouleur);
  }
  ligne.textContent = texte;

  return ligne;
}

// Renvoie la liste en commençant à partir d'une autre ligne
function decalerLignes(lignes, decalage) {
  const debut = decalage % lignes.length;
  return lignes.slice(debut).concat(lignes.slice(0, debut));
}

// Crée une colonne : la liste y est écrite deux fois pour boucler sans coupure
function creerColonne(lignes) {
  const colonne = document.createElement("div");
  const piste = document.createElement("div");
  const lignesEnDouble = lignes.concat(lignes);

  colonne.className = "colonne-code";
  piste.className = "colonne-code__piste";

  lignesEnDouble.forEach(function (texte, position) {
    piste.appendChild(creerLigne(texte, position % lignes.length));
  });

  colonne.appendChild(piste);
  return colonne;
}

// Remplit le fond de l'accueil avec toutes les colonnes
function remplirFondDeCode() {
  const fond = document.getElementById("fond-code");
  if (fond === null) {
    return;
  }

  for (let numero = 0; numero < NOMBRE_DE_COLONNES; numero++) {
    const lignes = decalerLignes(LIGNES_DE_CODE, numero * DECALAGE_ENTRE_COLONNES);
    fond.appendChild(creerColonne(lignes));
  }
}

remplirFondDeCode();
