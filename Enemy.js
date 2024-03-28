class Enemy {
  constructor(x, y) {
    // this.w = 30
    // this.h = 30;
    this.x = x;
    this.y = y;
    this.vx = 4;
    // this.image = img;
  }

  parentDraw(img) {
    fill('red');
    rectMode(CORNER);
    if (debug) {
      rect(this.x, this.y, this.w, this.h);
    }    
    image(img, 
      this.x, 
      this.y, 
      this.w, 
      this.h
    )
  }


}

class Alien extends Enemy {
  constructor(x, y, img) {
    super(x, y)
    this.w = 30;
    this.h = 30;
    this.pos = createVector(x, y);
    this.vel = createVector(4, 0);
    this.image = img
  }

  move() {
    // if (this.y > height/2) {
    //   this.vx += 4
    // }
    this.x -= this.vx
  }

  draw() {
    this.parentDraw(this.image)
  }


}

// create a new enemy subclass with different gfx and behaviour