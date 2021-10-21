let partoche;
let button;

function setup() {
  createCanvas(400, 600);
  background(250);

  // partoche object
  partoche = {
    nom: "",
    auteur: "",
    gamme: "",
    tempo:"",
    lignes:""
  }

  // button
  button = createButton('Generate JSON');
  button.position(200, 10);
  button.mousePressed(savePartoche);

  // NOM
  let nom = createInput('');
  nom.position(180, 100);
  nom.size(100);
  nom.input(nomEvent);

  text("Nom : ", 45, 85);

  // AUTEUR
  let auteur = createInput('');
  auteur.position(180, 200);
  auteur.size(100);
  auteur.input(auteurEvent);
  text("Auteur : ", 45, 185);

  // GAMME
  let gamme = createInput('');
  gamme.position(180, 300);
  gamme.size(100);
  gamme.input(gammeEvent);
  text("Gamme : ", 45, 285);

  // TEMPO
  let tempo = createInput('');
  tempo.position(180, 400);
  tempo.size(100);
  tempo.input(tempoEvent);
  text("Tempo : ", 45, 385);

  // LIGNES
  let lignes = createInput('');
  lignes.position(180, 500);
  lignes.size(100);
  lignes.input(lignesEvent);
  text("Nombre de lignes : ", 45, 485);
}

function nomEvent() {
  partoche.nom = this.value();
}
function auteurEvent() {
  partoche.auteur = this.value();
}
function gammeEvent() {
  partoche.gamme = this.value();
}
function tempoEvent() {
  partoche.tempo = this.value();
}
function lignesEvent() {
  partoche.lignes = parseInt(this.value());
}

function savePartoche() {
  saveJSON(partoche, 'partoche.json');
}