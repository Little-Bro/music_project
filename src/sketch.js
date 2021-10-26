/* ------- GLOBAL VARIABLES ------- */
// lists
let notes = [];
let lignes = [];
let bemolsNotes = [];
let dieses_notes = [];
let armure = [];
let diesesHauteurs = [];
let bemolsHauteurs = [];
let notesToPlay = [];

// playing notes
let compteur = 0;

// images
let cle_sol, c, bemol;

// JSON
let alterations, frequencies;

// other
let playButton;
let partoche;
let numLignes, numAlterations;
let chiffrage;
let monoSynth;

/* ------- PRELOAD FUNCTION ------- */
function preload() {
  // images
  cle_sol = loadImage('./img/cle_sol.png');
  c = loadImage('./img/c.png');
  bemol = loadImage('./img/bemol.png');
  // JSON
  alterations = loadJSON('./json/alterations.json');
  frequencies = loadJSON('./json/frequencies.json');
  partoche = loadJSON('./json/partoche.json');
}

/* ------- SETUP FUNCTION ------- */
function setup() {  
  createCanvas(1400, 800);
  // play button
  playButton = createButton('Jouer');
  playButton.position(width - 70 , 50);
  playButton.size(70, 70);
  playButton.mouseClicked(playButtonClicked);
  // playing notes
  monoSynth = new p5.MonoSynth();
  notesToPlay = [];  
  // alterations
  numAlterations = 0;
  diesesHauteurs = {
    "fa": '20',
    "do": '50',
    "sol": '10',
    "re": '40',
    "la": '70',
    "mi": '30',
    "si": '60',
  };
  bemolsHauteurs = {
    "si": '60',
    "mi": '30',
    "la": '70',
    "re": '40',
    "sol": '80',
    "do": '50',
    "fa": '90',
  };
  // taking information from ./json/partoche.json
  armure = getArmure(partoche.gamme); // returns [num, type]
  chiffrage = partoche.chiffrage.split('/'); // [x, y]
  numLignes = partoche.lignes;
  // alterated notes are placed in bemolsNotes and diesesNotes
  for (let i = 0; i < numLignes; i++) {
    for (let j = 0; j < armure[0]; j++) {
      if (armure[1] == 'bemol' && i == 0) {
        bemolsNotes.push(Object.keys(bemolsHauteurs)[j]);
        numAlterations++;
      } else if (armure[1] == 'diese' && i == 0) {
        dieses_notes.push(Object.keys(diesesHauteurs)[j]);
        numAlterations++;
      }
    }
  }
    // filling the lines array
  for (let i = 0; i < numLignes; i++) {
    lignes.push(new Ligne(150 + i * 200, frequencies, bemolsNotes, dieses_notes));
  }
}

/* ------- DRAW FUNCTION ------- */
function draw() {
  background(255);

  if (compteur >= notesToPlay.length) {
    metronome.stop();
    compteur = 0;
  }

  displaySymbolsAndCursor();
  displayNameAndTempo();
  displayNotes();
}

/* ------- SOME UTILITY FUNCTIONS ------- */
function mouseReleased() {
  for (ligne of lignes) {
    if (ligne.isMouseInLigne()) {
      if (keyIsDown(SHIFT))
        ligne.addNote('blanche', notesToPlay);
      else
        ligne.addNote('noire', notesToPlay);
    }
  }
}

function getArmure(gamme) {
  let num = 0;
  let type = '';
  let d = Object.values(alterations)[0];
  let b = Object.values(alterations)[1];
  // dieses
  for (let i = 0; i < Object.values(d).length; i++) {
    if (Object.values(d)[i].includes(gamme)) {
      num = i + 1;
      type = 'diese';
    }
  }
  // bemols
  for (let i = 0; i < Object.values(b).length; i++) {
    if (Object.values(b)[i].includes(gamme)) {
      num = i + 1;
      type = 'bemol';
    }
  }
  return [num, type];
}

function playButtonClicked() {
  let tempo = 60 / parseInt(partoche.tempo) * 1000;
  metronome.interval = tempo;
  compteur = 0;
  metronome.start();
}
