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
    // black or white
    strokeWeight(3);
    if (this.type == 'noire')
      fill(0);
    else if (this.type == 'blanche')
      fill(255);
    translate(this.x, this.y);

    // little bar
    strokeWeight(2);
    if (this.queue == 'haut')
      line(10, 0, 10, -60);
    else if (this.queue == 'bas')
      line(-10, 0, -10, 60);

    // elliptic part
    rotate(-PI / 10);
    ellipse(0, 0, 20, 15);
    pop();

    // if outside of partoche
    if (this.barre) {
      line(this.x-15, this.y, this.x+15, this.y);
    }
  }
}