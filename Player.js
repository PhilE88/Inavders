// Fix player hitbox. Create two rect hit boxes, one for ship body, one for wings

class Player {
  constructor(img) {
    this.w = 30;
    this.h = 80;
    this.x = 75;
    this.y = height-this.w;
    this.vy = 0; 
    this.vx = 4
    // this.gravity = 0.6;
    this.score = 0;
    this.direction = 'right';
    this.image = img;
    this.hitBoxVert = {
      x: this.x-this.w/2,
      y: this.y-this.h/2,
      w: this.w,
      h: this.h
    }
    this.hitBoxHoriz = {
      x: this.x-this.w,
      y: this.y,
      w: this.h/1.35,
      h: this.w
    }
  }

  jump() {
    this.vy = -12
  }

  move(dir) {
    if (!dir) {
      console.log("Error 20");
      fill('red')
      text('Error 20', width/2, height/2)
      noLoop();
    }

    if (this.x > 0 && this.x < width) {
      this.x += dir*this.vx;
    } else if (this.x <= 0) {
      this.x += 1
    } else if (this.x >= width) {
      this.x -= 1
    }
    
  }

  hits(thing) {
    return collideRectRect(
      thing.x, thing.y, thing.w, thing.h, 
      this.x, this.y, this.w, this.h
    );
  }

  draw() {
    fill('white')
    rectMode(CORNER)
    if (debug) {
      rect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
      rect(this.x-this.w,this.y,this.h/1.35,this.w);
    }    
    image(this.image, 
      this.x-(this.w/2)-15, 
      this.y-this.h/2, 
      this.w+30, 
      this.h
    )
  }
}