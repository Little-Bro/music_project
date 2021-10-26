/* ------- GLOBAL VARIABLES ------- */
// lists
let notes = [];
let lignes = [];
let dieses = [];
let bemols = [];
let bemols_notes = [];
let dieses_notes = [];

let results = [];
let notesY_d = [];
let notesY_b = [];

// playing notes
let compteur = 0;
notes_to_play = [];

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
let myPhrase, myPart;

/* ------- PRELOAD FUNCTION ------- */
function preload() {
  // images
  cle_sol = loadImage('./cle_sol.png');
  c = loadImage('./c.png');
  bemol = loadImage('./bemol.png');

  // JSON
  alterations = loadJSON('./alterations.json');
  frequencies = loadJSON('./frequencies.json');
  partoche = loadJSON('./partoche.json');
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
  notes_to_play = [];  
  /* there's padding at the start
   so it has time to set up everything */

  // alterations
  numAlterations = 0;
  // TODO : improve this system
  notesY_d = {
    "fa": '20',
    "do": '50',
    "sol": '10',
    "re": '40',
    "la": '70',
    "mi": '30',
    "si": '60',
  };

  notesY_b = {
    "si": '60',
    "mi": '30',
    "la": '70',
    "re": '40',
    "sol": '80',
    "do": '50',
    "fa": '90',
  };

  bemols = ['si', 'mi', 'la', 're', 'sol', 'do', 'fa'];
  dieses = [ ...bemols].reverse();
  results = getArmature(partoche.gamme); // returns [num, type]

  chiffrage = partoche.chiffrage.split('/'); // [x, y]

  // lines
  numLignes = partoche.lignes;
  for (let i = 0; i < numLignes; i++) {
    lignes.push(new Ligne(150 + i * 200, frequencies));
  }

  // alterated notes are placed in bemols_notes and dieses_notes
  for (let i = 0; i < numLignes; i++) {
    for (let j = 0; j < results[0]; j++) {
      if (results[1] == 'bemol' && i == 0) {
        bemols_notes.push(Object.keys(notesY_b)[j]);
        numAlterations++;
      } else if (results[1] == 'diese' && i == 0) {
        dieses_notes.push(Object.keys(notesY_d)[j]);
        numAlterations++;
      }
    }
  }
}

/* ------- DRAW FUNCTION ------- */
function draw() {
  background(255);

  if (compteur >= notes_to_play.length) {
    metronome.stop();
    compteur = 0;
  }

  // displaying alterations
  for (let i = 0; i < numLignes; i++) {
    for (let j = 0; j < results[0]; j++) {
      if (results[1] == 'bemol') {
        bemol.resize(80, 0);
        image(bemol, 60 + j*20, 100 + i * 200 + parseInt(notesY_b[bemols[j]]));
      } else {
        displayDiese(80 + j*20, 160 + i * 200 + parseInt(notesY_d[dieses[j]]));
      }
    }

    /* displaying symbols at the 
     * beginning of lines */
    image(cle_sol, 5, 130 + i * 200);

    // displaying chiffrage
    if (chiffrage[0] == '4' && chiffrage[1] == '4') {
      image(c, 60 + numAlterations * 20, 165 + i * 200);
      c.resize(85, 0);
    } else {
      textSize(60);
      textFont('Times New Roman');
      text(chiffrage[0], results[0]*20 + 90, 210 + i * 200);
      text(chiffrage[1], results[0]*20 + 90, 250 + i * 200);
    } 

    // displaying the lines
    lignes[i].display();

    // green / red cursor
    if (lignes[i].isMouseInLigne()) {
      lignes[i].checkMouse(lignes[i].isMouseColliding(notes));
    }
  }

  // displaying name of partoche
  textSize(60);
  text(partoche.nom, width / 2 - (partoche.nom.length * 10), 80);
  textSize(20);
  text(`par ${partoche.auteur}`, width / 2 - (partoche.auteur.length * 5), 110);

  // displaying tempo
  displayTempoNote(110, 120);
  textSize(24);
  text(`= ${partoche.tempo}`, 130, 125);

  // displaying the notes
  if (notes.length != 0) {
    for (note of notes) {
      note.display();
    }
  }
}

/* ------- UTILITY FUNCTIONS ------- */
function mouseReleased() {
  for (ligne of lignes) {
    if (ligne.isMouseInLigne()) {
      if (keyIsDown(SHIFT))
        ligne.addNote('blanche', bemols_notes, dieses_notes, notes_to_play);
      else
        ligne.addNote('noire', bemols_notes, dieses_notes, notes_to_play);
    }
  }
}

function getArmature(gamme) {
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

function displayTempoNote(x, y) {
    push();
    translate(x, y);
    // little bar
    strokeWeight(2);
    line(5, 0, 5, -30);
    // elliptic part
    rotate(-PI / 10);
    fill(0);
    ellipse(0, 0, 10, 7);
    pop();
}

function displayDiese(x, y) {
  push();
  strokeWeight(2);
  translate(x, y);
  line(-4, -18, -4, 18);
  line(4, -18, 4, 18);
  rotate(-PI/10);
  strokeWeight(3);
  line(-8, -5, 12, -5);
  line(-10, 5, 10, 5);
  pop();
}

function Metronome(workFunc, interval) {
  let that = this;
  let expected, timeout;
  this.interval = interval;

  this.start = function() {
    expected = Date.now() + this.interval;
    timeout = setTimeout(step, this.interval);
  }

  this.stop = function() {
    clearTimeout(timeout);
  }

  function step() {
    var drift = Date.now() - expected;
    workFunc();
    expected += that.interval;
    timeout = setTimeout(step, Math.max(0, that.interval-drift));
  }
}

let tick = function() {
  monoSynth.play(parseInt(notes_to_play[compteur]), 1, 0, 1/6);
  compteur++;
};

let metronome = new Metronome(tick, 1000);

function playButtonClicked() {
  let tempo;
  tempo = 60 / parseInt(partoche.tempo) * 1000;
  metronome.interval = tempo;
  compteur = 0;
  metronome.start();
}