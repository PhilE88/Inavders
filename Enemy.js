class Enemy {
  constructor(x, y) {
    // this.w = 30
    // this.h = 30;
    this.x = x;
    this.y = y;
    // this.vx = 4;
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
    this.vx = 4;
    this.pos = createVector(x, y);
    this.vel = createVector(4, 0);
    this.image = img

    this.hp = 1;
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

  fire() {}


}

// create a new enemy subclass with different gfx and behaviour
class Alien2 extends Alien {
  constructor(x, y, img) {
    super(x, y, img)
    this.w = 42;
    this.h = 42;
    this.vx = 5;
    this.pos = createVector(x, y);
    this.vel = createVector(4, 0);
    this.image = img

    this.hp = 3;
    this.fireRate = floor(frameCount*0.075);
    this.canShoot = true;
    this.lastShot = 0;
  }

  fire() {
    // console.log('s', s)
    // console.log('this.lastShot', this.lastShot)
    if (this.lastShot+2 > s) {
      this.canShoot = true;
    }
    if (this.canShoot) {
      if (s > this.lastShot) {
        enemyBullets.push(new EnemyBullet(this.x, this.y))
        this.canShoot = false;
        this.lastShot = s;
      } 
    } 
  }
}