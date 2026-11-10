// =====================================================
// Lignes de code qui défilent derrière le nom (accueil)
// Les couleurs, largeurs et vitesses sont dans css/accueil.css
// =====================================================

// Nombre de colonnes de code affichées côte à côte
const NOMBRE_DE_COLONNES = 8;

// Lignes affichées. Pour en ajouter, il suffit d'ajouter une ligne ici.
//   - une ligne qui commence par « # » ou « -- » est un commentaire
//   - <k>...</k> colore un mot-clé en violet
//   - <s>...</s> colore une valeur en bleu
const LIGNES_DE_CODE = [
  '# Configuration VLAN — switch Cisco',
  'Switch(config)# <k>vlan</k> 10',
  'Switch(config-vlan)# <k>name</k> <s>ADMIN</s>',
  'Switch(config)# <k>interface</k> gi0/1',
  'Switch(config-if)# <k>switchport mode</k> trunk',
  'Switch(config-if)# <k>switchport trunk allowed vlan</k> 10,20,30',
  'Router(config)# <k>access-list</k> 101 <k>permit</k> tcp any host 10.0.10.5 eq 22',
  'Router(config)# <k>ip ssh version</k> 2',
  '# Pare-feu UFW',
  '$ <k>sudo</k> ufw default deny incoming',
  '$ <k>sudo</k> ufw allow from 10.0.10.0/24 to any port 22',
  '$ <k>sudo</k> ufw enable',
  '# Sauvegarde Proxmox',
  '$ <k>vzdump</k> 101 --storage <s>pbs-backup</s> --mode snapshot',
  '$ <k>qm</k> list',
  '$ <k>pct</k> start 204',
  '# Active Directory',
  'PS> <k>New-ADUser</k> -Name <s>"j.dupont"</s> -Enabled $true',
  'PS> <k>New-GPO</k> -Name <s>"Securite-Postes"</s>',
  'PS> <k>Get-ADComputer</k> -Filter * | Select Name',
  '# DHCP / DNS',
  'subnet 192.168.10.0 netmask 255.255.255.0 {',
  '  <k>range</k> 192.168.10.100 192.168.10.200;',
  '  <k>option routers</k> 192.168.10.254;',
  '}',
  '$ <k>dig</k> @10.0.10.2 <s>srv-ad.lab.local</s>',
  '$ <k>nslookup</k> glpi.lab.local',
  '# RAID et stockage',
  '$ <k>mdadm</k> --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc',
  '$ <k>cat</k> /proc/mdstat',
  '$ <k>df</k> -h /srv/partage',
  '# Diagnostic réseau',
  '$ <k>ping</k> -c 4 10.0.20.1',
  '$ <k>traceroute</k> 8.8.8.8',
  '$ <k>ip</k> a show eth0',
  '$ <k>ss</k> -tulpn | grep 443',
  '$ <k>tcpdump</k> -i eth0 port 53',
  '# SSH durci',
  '$ <k>ssh-keygen</k> -t ed25519 -C <s>"admin@srv"</s>',
  'PermitRootLogin <s>no</s>',
  'PasswordAuthentication <s>no</s>',
  '$ <k>systemctl</k> restart sshd',
  '# Logs Syslog',
  '$ <k>tail</k> -f /var/log/syslog',
  '$ <k>journalctl</k> -u apache2 --since today',
  '# Script bash',
  '<k>for</k> host <k>in</k> $(cat hosts.txt); <k>do</k>',
  '  ping -c1 -W1 $host && echo <s>"$host UP"</s>',
  '<k>done</k>',
  '-- SQL inventaire GLPI',
  '<k>SELECT</k> name, serial <k>FROM</k> glpi_computers <k>WHERE</k> is_deleted = 0;',
];

// Indique si une ligne est un commentaire
function estUnCommentaire(ligne) {
  return ligne.startsWith('#') || ligne.startsWith('--');
}

// Remplace les balises <k> et <s> par des <span> colorés
function colorerLigne(ligne) {
  return ligne
    .replaceAll('&', '&amp;')
    .replaceAll('<k>', '<span class="code-mot-cle">')
    .replaceAll('<s>', '<span class="code-valeur">')
    .replaceAll('</k>', '</span>')
    .replaceAll('</s>', '</span>');
}

// Crée l'élément HTML d'une ligne de code
function creerLigne(ligne) {
  const element = document.createElement('div');
  element.className = 'code-line';
  if (estUnCommentaire(ligne)) {
    element.classList.add('code-line--commentaire');
  }
  element.innerHTML = colorerLigne(ligne);
  return element;
}

// Renvoie une copie mélangée d'un tableau
function melanger(tableau) {
  const copie = tableau.slice();
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// Crée une colonne : les lignes y sont mises deux fois de suite
// pour que l'animation CSS boucle sans à-coup
function creerColonne() {
  const colonne = document.createElement('div');
  colonne.className = 'code-col';

  const piste = document.createElement('div');
  piste.className = 'code-track';

  const lignes = melanger(LIGNES_DE_CODE);
  lignes.concat(lignes).forEach(function (ligne) {
    piste.appendChild(creerLigne(ligne));
  });

  colonne.appendChild(piste);
  return colonne;
}

// Remplit le fond de la section d'accueil
function afficherCodeDefilant() {
  const fond = document.querySelector('.code-bg');
  if (!fond) {
    return;
  }
  for (let i = 0; i < NOMBRE_DE_COLONNES; i++) {
    fond.appendChild(creerColonne());
  }
}

afficherCodeDefilant();
