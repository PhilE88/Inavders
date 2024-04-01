class Powerup {
  constructor(x, y, type) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 4);
    this.size = 18;
    this.txtOffset = 5;
    if (type === 1) {
      this.type = 'playerSpeed'
    } else if (type === 2) {
      this.type = 'bulletSpeed'
    } else if (type === 3) {
      this.type = 'bulletMax'
    }
  }

  update() {
    this.pos.add(this.vel)
  }

  hits(thing) {
    return collideRectCircle(
      thing.hitBoxVert.x, thing.hitBoxVert.y, thing.hitBoxVert.w, thing.hitBoxVert.h, 
      this.pos.x, this.pos.y, this.size
    ) || collideRectCircle(
      thing.hitBoxHoriz.x, thing.hitBoxHoriz.y, thing.hitBoxHoriz.w, thing.hitBoxHoriz.h, 
      this.pos.x, this.pos.y, this.size
    )
  }

  draw() {
    if (this.type === 'playerSpeed') {
      push()
      fill('green')
      circle(this.pos.x, this.pos.y, this.size)
      fill('limegreen')
      stroke(0)
      textSize(14)
      textStyle(BOLD)
      textAlign(CENTER)
      text(`P`, this.pos.x, this.pos.y+this.txtOffset)
      pop()
    }
    if (this.type === 'bulletSpeed') {
      push()
      fill('yellow')
      circle(this.pos.x, this.pos.y, this.size)
      fill(0)
      textSize(14)
      textStyle(BOLD)
      textAlign(CENTER)
      text(`P`, this.pos.x, this.pos.y+this.txtOffset)
      pop()
    }
    if (this.type === 'bulletMax') {
      push()
      fill('pink')
      circle(this.pos.x, this.pos.y, this.size)
      fill(0)
      textSize(14)
      textStyle(BOLD)
      textAlign(CENTER)
      text(`P`, this.pos.x, this.pos.y+this.txtOffset)
      pop()
    }
  }
}