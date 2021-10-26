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