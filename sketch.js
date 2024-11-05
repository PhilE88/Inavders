// P5.js library
let debug = false;
let player;
let pImg;
let eImg;
let e2Img;
let enemies = [];
let numEnemiesStart = 8;
let bullets = [];
let enemyBullets = [];
let bulletSpeed = 0;
let bulletMax = 1;
let gameover = false;
let stars = [];
let numStars = 200;
let explosions = [];
let powerups = [];
let chance = 2;

function drawRect(obj) {
  rect(obj.x, obj.y, obj.w, obj.h)
}

function preload() {
  pImg = loadImage(
    '/assets/spaceship.png', 
    img => console.log('Image loaded!', img), 
    e => console.log('Error loading spaceship.png image', e)
  );
  eImg = loadImage(
    '/assets/alien.png', 
    img => console.log('Image loaded!', img), 
    e => console.log('Error loading alien.png image', e)
  );
  e2Img = loadImage(
    '/assets/alien2.png', 
    img => console.log('Image loaded!', img), 
    e => console.log('Error loading alien.png image', e)
  );
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(800, 600);
  // createCanvas(400, 300);
  player = new Player(pImg);
  for (let i = 0; i < numEnemiesStart; i++) {
    enemies[i] = new Alien(i*60+200, 58, eImg)
  }
  for (let i = 0; i < numStars; i++) {
    stars[i] = new Star();
  }
  frameRate(30)
}

function keyPressed() {
  if (key === 'd') {
    debug = !debug;
  }
  if (key === ' ') {
    bullets.push(new Bullet(player.x, player.y))
    if (bulletMax > 1) {
      for (let i = 1; i < bulletMax; i++) {      
        if (i % 2 == 0) {
         i *= -1; 
        } 
        bullets.push(new Bullet(player.x+12*i, player.y));
        i = abs(i);    
      }
    }
    // console.log(bullets);
  }
  if (key === 's') {
    console.log(stars);
  }
  if (key === 'e') {
    console.log(enemies);
  }
  if (key === 'c') {
    console.log(chance);
  }
}

function draw() {
  background(50)

  for (let i = 0; i < stars.length; i++) {
    if (stars[i].y > height) {
      stars[i] = new Star()
      stars[i].y = 0;
    }
    stars[i].move();
    stars[i].draw();
  }
  
  s = floor(frameCount * 0.033)  

  fill('white')
  textSize(20)
  textAlign(LEFT)
  text(`Score: ${player.score}`, 10, 22)
  text(`Time: ${s}`, width-85, 22)
  if (debug) {
    text(`FPS: ${frameRate()}`, width-100, 44)
  }

  
  if (keyIsDown(RIGHT_ARROW)) {
    player.move(1);
  }
  if (keyIsDown(LEFT_ARROW)) {
    player.move(-1);
  }

  enemies.forEach(enemy => {
    enemy.draw();
    enemy.move();
    // Constantly fire bullets, looks like a laser beam
    enemy.fire();
    
    // enemy collides with player: game ends
    if (player.hits(enemy)) {
      gameover = true;
    }

    // enemies bounce off wall and move down
    if (enemy.x < 0 || enemy.x+enemy.w > width) {
      enemy.vx *= -1
      enemy.y += enemy.h + enemy.h/2
    }

    // Bullet hits enemy
    bullets.forEach(bullet => {
      if (bullet.hits(enemy)) {
        // Add explosion effect at enemy position
        explosions.push(new Explosion(enemy.x, enemy.y));
        // Destroy the bullet
        bullets.splice(bullets.indexOf(bullet), 1);
        // Destroy the enemy
        enemies.splice(enemies.indexOf(enemy), 1);
        // Score points
        player.score++;
        // Powerup chance
        let rndChance = round(random(chance));
        let rndType = round(random(1, 3));
        // If you're lucky
        if (rndChance == chance) {
          console.log(rndType);
          // Win one of three prizes
          powerups.push(new Powerup(enemy.x, enemy.y, rndType))
          console.log(powerups);
        }
      }
    });

    // Bullet hits Player
    enemyBullets.forEach(bullet => {
      if (bullet.hits(player) || player.hits(bullet)) {
        // Destroy the bullet
        bullets.splice(bullets.indexOf(bullet), 1);
        // Destroy the player
        gameover = true;
      }
    })
  })  
  
  player.draw();
  if (explosions) {
    for (let explosion of explosions) {
      explosion.draw();
      if (explosion.particles.length < 1) {
        let explToRemove = explosions.indexOf(explosion);
        explosions.splice(explToRemove, 1);
      }
    }
  }

  if (powerups) {
    for (let powerup of powerups) {
      powerup.update();
      powerup.draw();
      if (powerup.hits(player)) {
        player.score += 5;
        if (powerup.type === 'playerSpeed') {
          if (player.vx < 12) {
            player.vx += 2
            console.log('Player Speed: ', player.vx);
          } else {
            console.log('Player Speed MAXED: ', player.vx);
          }
        }
        if (powerup.type === 'bulletSpeed') {
          if (bulletSpeed < 12) {
            bulletSpeed += 2
            console.log('Bullet Speed: ', bulletSpeed);
          } else {
            console.log('Bullet Speed MAXED: ', bulletSpeed);
          }
        }
        if (powerup.type === 'bulletMax') {
          if (bulletMax < 9) {
            bulletMax++
            console.log('Bullet Num: ', bulletMax);
          } else {
            console.log('Bullet Num MAXED: ', bulletMax);
          }          
        }
        // Remove powerup
        let powerupToRemove = powerups.indexOf(powerup);
        powerups.splice(powerupToRemove, 1);
      }
      if (powerup.pos.y >= height) {
        // Remove powerup
        let powerupToRemove = powerups.indexOf(powerup);
        powerups.splice(powerupToRemove, 1);
        console.log(powerups);
      }
    }
  }

  if (bullets.length > 0) {    
    bullets.forEach(bullet => {
      bullet.move(bulletSpeed);
      bullet.draw();
      if (bullet.y < 0) {
        bullets.splice(bullets.indexOf(bullet), 1);
      }
    })
  }

  if (enemyBullets.length > 0) {    
    enemyBullets.forEach(bullet => {
      bullet.move();
      bullet.draw();
      if (bullet.y > height) {
        enemyBullets.splice(enemyBullets.indexOf(bullet), 1);
      }
    })
  }

  if (player.score < 10 && enemies.length < 4) {
    generateMoreEnemies(2)
    console.log('stage1');
  }
  if (player.score > 199 && enemies.length < 3) {
    generateMoreEnemies(30);
    console.log('stage6');
    chance++
  } else if (player.score > 99 && player.score < 200 && enemies.length < 4) {
    generateMoreEnemies(18);
    console.log('stage5');
    chance++
  } else if (player.score > 49 && enemies.length < 3) {
    generateMoreEnemies(14);
    console.log('stage4');
    chance++
  } else if (player.score > 29 && enemies.length < 4) {
    generateMoreEnemies(10);
    console.log('stage3');
  } else if (player.score > 10 && enemies.length < 3) {
    generateMoreEnemies(7);
    console.log('stage2');
  }


  if (gameover) {
    textSize(38);
    fill('white');
    textAlign(CENTER)
    text('GAME OVER\nclick to restart', width/2, height/2);
    noLoop();
  }

}

window.addEventListener('click', () => {
  gameover ? location.reload() : console.log(`Gameover: ${gameover}`);
})

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function generateMoreEnemies(qty) {
  for (let i = 0; i < qty; i++) {
    let yPos = qty > 6 ? random(60, 330) : 60;
    // Add different enemies here
    let enem = new Alien(random(60, width-60), yPos, eImg);
    // Without using random(x, y) coordinates, eneies pile up on themselves
    // Illusion of stronger armor, as it takes more hits to kill
    let enem2 = new Alien2(width/2, height/2, e2Img);
    // Enemies random velocity factor between -2 and 2
    enem.vx *= random([-2, -1.5, -1, 1, 1.5, 2]);
    enemies.push(enem);
    enemies.push(enem2);
  }  
}