class Note {
  constructor(x, y, type, nom, queue, bar) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.nom = nom;
    this.queue = queue;
    this.barre = bar;
  }

  display() {
    push();
    strokeWeight(3);
    if (this.barre) {
      line(this.x - 15, this.y, this.x + 15, this.y);
    }
    if (this.queue == 'bas') {
      // pointe vers le bas
      line(this.x - 9, this.y, this.x - 9, this.y + 40);
    } else if (this.queue == 'haut') {
      // pointe vers le haut
      line(this.x + 9, this.y, this.x + 9, this.y - 40);
    }

    // round part
    // strokeWeight(1);
    if (this.type == 'noire') {
      fill(0);
    } else if (this.type == 'blanche') {
      fill(255);
    }
    ellipse(this.x, this.y, 20, 20); 
    pop();
  }
}