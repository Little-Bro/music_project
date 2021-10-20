/* ------- GLOBAL VARIABLES ------- */
// lists
let notes = [];
let lignes = [];
let dieses = [];
let bemols = [];
let results = [];
let notesY_d = [];
let notesY_b = [];
// images
let cle_sol, c, bemol;
// other
let partoche;
let gamme;

/* ------- PRELOAD FUNCTION ------- */
function preload() {
  cle_sol = loadImage('./cle_sol.png');
  c = loadImage('./c.png');
  bemol = loadImage('./bemol.png');
  alterations = loadJSON('./alterations.json');
}

/* ------- SETUP FUNCTION ------- */
function setup() {
  createCanvas(1400, 800);
  
  // partoche object
  partoche = {
    "nom": 'partoche',
    "gamme": 'lab-majeur',
    "tempo" : '76',
    "lignes": lignes,
    "notes": notes
  };

  // alterations
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
  results = getArmature(partoche.gamme); // [num, type]

  // lines
  for (let i = 0; i < 3; i++) {
    lignes.push(new Ligne(150 + i * 200));
  }
}

/* ------- DRAW FUNCTION ------- */
function draw() {
  background(255);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < results[0]; j++) {
      if (results[1] == 'bemol') {
        bemol.resize(60, 0);
        image(bemol, 110 + j*20, 115 + i * 200 + parseInt(notesY_b[bemols[j]]));
      } else {
        textSize(30);
        text('#', 130 + j*20, 160 + i * 200 + parseInt(notesY_d[dieses[j]]));
      }
    }
  }

  // displaying tempo
  displayTempoNote(110, 120);
  textSize(24);
  text(`= ${partoche.tempo}`, 130, 125);

  // looping through all the lines
  for (let i = 0; i < 3; i++) {
    /* displaying symbols at the 
     * beginning of lines */
    image(cle_sol, 5, 130 + i * 200);
    image(c, 60, 165 + i * 200);
    c.resize(85, 0);

    // displaying the lines
    lignes[i].display();

    // green / red cursor
    if (lignes[i].isMouseInLigne()) {
      lignes[i].checkMouse(lignes[i].isMouseColliding(notes));
    }
  }
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
        ligne.addNote('blanche');
      else
        ligne.addNote('noire');
    }
  }
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
