let partoche = {
    nom: "",
    auteur: "",
    gamme: "",
    chiffrage:"",
    tempo:"",
    lignes:""
  }

function setup() {}

function setJSON(nom, auteur, gamme, chiffrage, tempo, lignes) {
 partoche.nom = nom;
 partoche.auteur = auteur;
 partoche.gamme = gamme;
 partoche.chiffrage = chiffrage;
 partoche.tempo = tempo;
 partoche.lignes = lignes;
 saveJSON(partoche, 'partoche.json');
}