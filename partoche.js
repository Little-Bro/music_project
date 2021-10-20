class Partoche {
  constructor(hauteur, notes) {
    this.hauteur = hauteur;
    this.notes = notes;
    this.canAddNote = true;
    this.tailleM = 350;
  }

  display(notes) {
    // determines the note
    this.determineNote();

    // drawing a red/green circle depending on
    // mouse position
    let collision = this.isMouseColliding(notes);
    this.checkMouse(collision);

    // displaying the lines
    const espace = 20;
    // vertical lines
    line(10, this.hauteur + espace, 10, this.hauteur + 5 * espace)
    line(width - 10, this.hauteur + espace, width - 10, this.hauteur + 5 * espace);
    // mesures
    strokeWeight(1);
    for (let i = 0; i < 3; i++) {
      line(i * this.tailleM + this.tailleM, this.hauteur + espace, i * this.tailleM + this.tailleM, this.hauteur + 5 * espace);
    }
    // horizontal lines
    for (let i = 0; i < 5; i++) {
      line(10, (this.hauteur + i * espace + espace), width - 10, (this.hauteur + i * espace + espace));
    }
  }

  // checking if the mouse is within the boundaries
  // of the partoche
  isMouseInPartoche() {
    return (mouseX > 150 && mouseX < (width - 5) &&
      mouseY > (this.hauteur - 40) && mouseY < (this.hauteur + 7 * 20));
  }

  isMouseColliding(notes) {
    let closest = this.detectClosest(notes);
    if (closest) {
      let d = dist(mouseX, mouseY, closest.x, closest.y);
      return (d < 25);
    }
  }

  displayOtherLines() {
    push();
    stroke(40, 160, 220, 150);
    if (mouseY > this.hauteur - 40 && mouseY < this.hauteur + 20) {
      line(10, this.hauteur - 20, width - 10, this.hauteur - 20);
      if ((mouseY > this.hauteur - 20)) {
        line(10, this.hauteur, width - 10, this.hauteur)
      }
    } else if (mouseY > this.hauteur + 5 * 20 && mouseY < this.hauteur + 7 * 20) {
      line(10, this.hauteur + 6 * 20, width - 10, this.hauteur + 6 * 20);
    }
    pop();
  }

  detectClosest(array) {
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < array.length; i++) {
      let d = dist(mouseX, mouseY, array[i].x, array[i].y);
      if (d < record) {
        record = d;
        closest = array[i];
      }
    }
    return closest;
  }

  // drawing green/red cursor
  checkMouse(collision) {
    push();
    this.displayOtherLines();
    if (!this.isMouseInPartoche() || collision) {
      fill(255, 0, 0, 150);
      this.canAddNote = false;
    } else {
      fill(0, 255, 0, 150);
      this.canAddNote = true;
    }

    noStroke();
    translate(mouseX, mouseY);
    strokeWeight(2);
    rotate(-PI / 10);
    ellipse(0, 0, 20, 15);
    pop();
  }

  determineNote() {
    let note = {
      nom: "",
      y: "",
      queue: "",
      bar: ""
    };

    const start = this.hauteur - 20;
    const espace = 20;

    let mouse_y = map(mouseY, start, (start + 7 * espace), 0, 7);
    let between_lines = false;

    // determining height
    note.y = start + (20 * Math.trunc(mouse_y));

    switch (mouse_y) {
      case 0: {
        note.nom = 'do';
        note.queue = 'bas';
        note.bar = 'true';
      }
      break;
    case 1: {
      note.nom = 'la';
      note.queue = 'bas';
      note.bar = 'true';
    }
    break;
    case 2: {
      note.nom = 'fa';
      note.queue = 'bas';
    }
    break;
    case 3: {
      note.nom = 're';
      note.queue = 'bas';
    }
    break;
    case 4: {
      note.nom = 'si';
      note.queue = 'bas';
    }
    break;
    case 5: {
      note.nom = 'sol';
      note.queue = 'haut';
    }
    break;
    case 6: {
      note.nom = 'mi';
      note.queue = 'haut';
    }
    break;
    case 7: {
      note.nom = 'do';
      note.queue = 'haut';
      note.bar = 'true';
      note.y = this.hauteur + 6 * espace;
    }
    break;
    }

    if (mouse_y > 0 && mouse_y < 1) {
      note.nom = 'si';
      note.queue = 'bas';
      between_lines = true;
    } else if (mouse_y > 1 && mouse_y < 2) {
      note.nom = 'sol';
      note.queue = 'bas';
      between_lines = true;
    } else if (mouse_y > 2 && mouse_y < 3) {
      note.nom = 'mi'
      note.queue = 'bas';
      between_lines = true;
    } else if (mouse_y > 3 && mouse_y < 4) {
      note.nom = 'do'
      note.queue = 'bas';
      between_lines = true;
    } else if (mouse_y > 4 && mouse_y < 5) {
      note.nom = 'la'
      note.queue = 'haut';
      between_lines = true;
    } else if (mouse_y > 5 && mouse_y < 6) {
      note.nom = 'fa'
      note.queue = 'haut';
      between_lines = true;
    } else if (mouse_y > 6 && mouse_y < 7) {
      note.nom = 're'
      note.queue = 'haut';
      between_lines = true;
    }

    if (between_lines)
      note.y += 10;

    // displaying note name
    text(note.nom, mouseX + 5, mouseY);

    return note;
  }

  // adding a note
  addNote(type) {
    if (this.canAddNote) {
      const n = this.determineNote();
      n.type = type;
      this.notes.push(new Note(mouseX, n.y, n.type, n.nom, n.queue, n.bar));
    }
  }
}