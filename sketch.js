let notes = [];
let partoches = [];
let cle_sol, c;

function preload() {
  cle_sol = loadImage('./cle_sol.png');
  c = loadImage('./c.png');
}

function setup() {
  createCanvas(1400, 800);
  for (let i = 0; i < 3; i++) {
    partoches.push(new Partoche(150 + i * 200, notes));
  }
}

function draw() {
  background(255);
  // looping through all the lines
  for (let i = 0; i < 3; i++) {
    /* displaying symbols at the 
     * beginning of lines */
    image(cle_sol, 5, 130+ i * 200);
    image(c, 60, 165+ i * 200);
    c.resize(85, 0);

    // displaying the lines
    partoches[i].display(notes);

    // green / red cursor
    if (partoches[i].isMouseInPartoche()) {
      partoches[i].checkMouse(partoches[i].isMouseColliding(notes));
    }
  }

  // displaying the notes
  if (notes.length != 0) {
    for (note of notes) {
      note.display();
    }
  }
}

function mouseReleased() {
  for (p of partoches) {
    if (p.isMouseInPartoche()) {
      if (keyIsDown(SHIFT))
        p.addNote('blanche');
      else
        p.addNote('noire');
    } 
  }
}

