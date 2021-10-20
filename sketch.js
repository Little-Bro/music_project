/* ------- GLOBAL VARIABLES ------- */
// lists
let notes = [];
let lignes = [];
let dieses = [];
let bemols = [];
// images
let cle_sol, c;
// other
let partoche;
let gamme;

/* ------- PRELOAD FUNCTION ------- */
function preload() {
  cle_sol = loadImage('./cle_sol.png');
  c = loadImage('./c.png');
  alterations = loadJSON('./alterations.json');
}

/* ------- SETUP FUNCTION ------- */
function setup() {
  createCanvas(1400, 800);
  
  // partoche object
  partoche = {
    "nom": 'partoche',
    "gamme": 'dob-majeur',
    "tempo" : '76',
    "lignes": lignes,
    "notes": notes
  };


  // alterations
  bemols = ['si', 'mi', 'la', 're', 'sol', 'do', 'fa'];
  dieses = [ ...bemols].reverse();
  let results = getArmature(partoche.gamme); // [num, type]
  console.log(`${results[0]} ${results[1]}`);
  for (let i = 0; i < results[0]; i++) {
    if (results[1] == 'bemol') {
      console.log(bemols[i]);
    } else {
      console.log(dieses[i]);
    }
  }

  // lines
  for (let i = 0; i < 3; i++) {
    lignes.push(new Ligne(150 + i * 200));
  }
}

/* ------- DRAW FUNCTION ------- */
function draw() {
  background(255);
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


// DON'T NEED FIRST LINE OF JSON FILE
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