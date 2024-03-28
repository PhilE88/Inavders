class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.shade = random(255);
    this.d = 2;
    this.vy = random(2, 10);
  }

  move() {
    this.y += this.vy;
  }

  draw() {
    push()
    strokeWeight(this.d);
    stroke(this.shade)
    point(this.x, this.y);
    pop()
  }
}