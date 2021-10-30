function displaySymbolsAndCursor() {
    // displaying alterations
  for (let i = 0; i < numLignes; i++) {
    for (let j = 0; j < armure[0]; j++) {
      if (armure[1] == 'bemol') {
        bemol.resize(80, 0);
        image(bemol, 60 + j*20, 100 + i * 200 + parseInt(bemolsHauteurs[Object.keys(bemolsHauteurs)[j]]));
      } else {
        displayDiese(80 + j*20, 150 + i * 200 + parseInt(diesesHauteurs[Object.keys(diesesHauteurs)[j]]));
      }
    }

    /* displaying symbols at the 
     * beginning of lines */
    image(cle_sol, 5, 130 + i * 200);

    // displaying the lines
    lignes[i].display();

    // green / red cursor
    if (lignes[i].isMouseInLigne()) {
      lignes[i].checkMouse(lignes[i].isMouseColliding(notes));
    }
  }
      // displaying chiffrage
    if (chiffrage[0] == '4' && chiffrage[1] == '4') {
      image(c, 60 + numAlterations * 20 + 10, 165);
      c.resize(85, 0);
    } else {
      textSize(60);
      textFont('Times New Roman');
      text(chiffrage[0], armure[0]*20 + 90, 210);
      text(chiffrage[1], armure[0]*20 + 90, 250);
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

function displayNameAndTempo() {
  // displaying name of partoche
  textSize(60);
  text(partoche.nom, width / 2 - (partoche.nom.length * 10), 80);
  textSize(20);
  text(`par ${partoche.auteur}`, width / 2 - (partoche.auteur.length * 5), 110);

  // displaying tempo
  displayTempoNote(110, 120);
  textSize(24);
  text(`= ${partoche.tempo}`, 130, 125);
}

function displayNotes() {
  // displaying the notes
  if (notes.length != 0) {
    for (note of notes) {
      note.display();
    }
  }  
}
