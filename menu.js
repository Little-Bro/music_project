let partoche;
let button;

function setup() {
  createCanvas(400, 600);
  background(250);
  button = createButton('Generate JSON');
  button.position(200, 10);
  button.mousePressed(showJSON)

  // NOM
  let nom = createInput('');
  nom.position(180, 100);
  nom.size(100);
  nom.input(nomEvent);
  textSize(13);
  text("Nom : ", 45, 85);

  // AUTEUR
  let auteur = createInput('');
  auteur.position(180, 200);
  auteur.size(100);
  auteur.input(auteurEvent);
  textSize(13);
  text("Auteur : ", 45, 185);

  // GAMME
  let gamme = createInput('');
  gamme.position(180, 300);
  gamme.size(100);
  gamme.input(gammeEvent);
  textSize(13);
  text("Gamme : ", 45, 285);

  // TEMPO
  let tempo = createInput('');
  tempo.position(180, 400);
  tempo.size(100);
  tempo.input(tempoEvent);
  textSize(13);
  text("Tempo : ", 45, 385);

  // LIGNES
  let lignes = createInput('');
  lignes.position(180, 500);
  lignes.size(100);
  lignes.input(lignesEvent);
  textSize(13);
  text("Nombre de lignes : ", 45, 485);


  partoche = {
    nom: "",
    auteur: "",
    gamme: "",
    tempo:"",
    lignes:""
  }
}




function nomEvent() {
  //console.log('you are typing: ', this.value());
  partoche.nom = this.value();
}
function auteurEvent() {
  //console.log('you are typing: ', this.value());
  partoche.auteur = this.value();
}
function gammeEvent() {
  //console.log('you are typing: ', this.value());
  partoche.gamme = this.value();
}
function tempoEvent() {
  //console.log('you are typing: ', this.value());
  partoche.tempo = this.value();
}
function lignesEvent() {
  //console.log('you are typing: ', this.value());
  partoche.lignes = parseInt(this.value());
}

function showJSON() {
  //let jPartoche = JSON.stringify(partoche);
  saveJSON(partoche, 'partoche.json');
}