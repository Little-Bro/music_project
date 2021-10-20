let p;
let notes = [];
let cle_sol, c;

function preload() {
  cle_sol = loadImage('./cle_sol.png');
  c = loadImage('./c.png');
}

function setup() {
  createCanvas(1400, 400);
  p = new Partoche('sol', 100, notes);
}

function draw() {
  background(255);
  image(cle_sol, 5, 85);
  image(c, 60, 118);
  c.resize(85, 0);
  p.display(notes);
  if (notes.length != 0) {
    for (note of notes) {
      note.display();
    }
  }
}

function mouseReleased() {
  if (p.isMouseInPartoche()) {
    if (keyIsDown(SHIFT))
      p.addNote('blanche');
    else
      p.addNote('noire');
  }
}
