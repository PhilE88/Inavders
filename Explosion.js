class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(2,4));
    this.accel = createVector();
    this.rgb = {
      R: random(200,255),
      G: random(100,255),
      B: 0,
      A: 255
    }
    this.color = color(this.rgb.R, this.rgb.G, this.rgb.B, this.rgb.A)
    // console.log(this.color.levels);
    this.size = 4;
  }

  
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.accel);
    // if (this.pos.x >= width) {
    //   this.vel.x = -this.vel.x
    // }
    this.color = color(this.rgb.R, this.rgb.G, this.rgb.B, this.rgb.A)
    this.rgb.A -= 3;
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
    // this.color.levels[3] -= 1;
    // console.log(this.color.levels[3]);
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
        // particle.color.levels[3] -= 2;
        // console.log(particle.color.levels[3]);
        if (particle.pos.x >= width || particle.pos.x <= 0 || particle.pos.y >= height || particle.pos.y <= 0) {
          let particleToRemove = this.particles.indexOf(particle);
          this.particles.splice(particleToRemove, 1);
          // console.log(this.particles);
        }
      }
    }
  }
}

class SmokeParticle extends Particle {
  constructor(x,y) {
    super(x, y)
    this.shade = random(255);
    this.vel = createVector(random(-2, 2), random(-8,-5));
    this.vel.setMag(random(2,4));

  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.accel);
    // if (this.pos.x >= width) {
    //   this.vel.x = -this.vel.x
    // }
    this.color = color(this.shade, this.rgb.A)
    this.rgb.A -= 3;
  }
}

class Smoke extends Explosion {
  constructor(x,y) {
    super(x,y)
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(new SmokeParticle(x, y)); 
    }
  }
}