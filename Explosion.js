class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(2,4))
    this.accel = createVector();
    this.color = color(random(200,255), random(100, 255), 0)
    this.size = 4;
  }

  
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.accel);
    // if (this.pos.x >= width) {
    //   this.vel.x = -this.vel.x
    // }
  }


  hits(thing) {
    return collideRectCircle(
      thing.pos.x, thing.pos.y, thing.w, thing.h,
      this.x, this.y, this.size
    );
  }

  draw() {
    push()
    strokeWeight(this.size);
    stroke(this.color);
    point(this.pos.x, this.pos.y)
    pop()
  }
}

class Explosion {
  constructor(x, y) {
    this.particles = [];
    this.numParticles = 24;
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(new Particle(x, y)); 
    }
  }

  draw() {
    if (this.particles) {
      for (let particle of this.particles) {
        particle.update()
        particle.draw()
        if (particle.pos.x >= width || particle.pos.x <= 0 || particle.pos.y >= height || particle.pos.y <= 0) {
          let particleToRemove = this.particles.indexOf(particle);
          this.particles.splice(particleToRemove, 1);
          // console.log(this.particles);
        }
      }
    }
  }
}