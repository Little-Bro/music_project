/* ------- GLOBAL VARIABLES ------- */
// lists
let notes = [];
let lignes = [];
// images
let cle_sol, c;
// objects
let partoche;

/* ------- PRELOAD FUNCTION ------- */
function preload() {
  cle_sol = loadImage('./cle_sol.png');
  c = loadImage('./c.png');
}

/* ------- SETUP FUNCTION ------- */
function setup() {
  createCanvas(1400, 800);

  for (let i = 0; i < 3; i++) {
    lignes.push(new Ligne(150 + i * 200, notes));
  }

  // partoche object
  partoche = {
    "nom": 'partoche',
    "gamme": '',
    "lignes": lignes,
    "notes": notes
  };
}

/* ------- DRAW FUNCTION ------- */
function draw() {
  background(255);
  // looping through all the lines
  for (let i = 0; i < 3; i++) {
    /* displaying symbols at the 
     * beginning of lines */
    image(cle_sol, 5, 130 + i * 200);
    image(c, 60, 165 + i * 200);
    c.resize(85, 0);

    // displaying the lines
    lignes[i].display(notes);

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
