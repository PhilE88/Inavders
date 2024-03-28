class Bullet {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.w = 10
    this.h = 10
    this.speed = 6
  }

  move(extraSpeed) {
    this.y -= (this.speed + extraSpeed);
  }

  hits(thing) {
    return collideRectCircle(
      thing.x, thing.y, thing.w, thing.h, 
      this.x, this.y, this.w
    );
  }

  draw() {
    // console.log('shoot')
    fill('limegreen');
    ellipse(this.x,this.y,this.w, this.h)
  }
}