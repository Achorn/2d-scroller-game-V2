import Player from "./player.js";
import InputHandler from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 40;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.maxParticles = 20;
      this.enemyTimer = 0;
      this.enemyInterval = 2000;
      this.debug = false;
      this.score = 0;
      this.winningScore = 40;
      this.fontColor = "white";
      this.time = 0;
      this.maxTime = 30000;
      this.gameOver = false;
      this.lives = 5;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      this.time += deltaTime;
      if (this.time >= this.maxTime) this.gameOver = true;

      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handle Enemies

      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }

      this.enemies.forEach((enemy) => enemy.update(deltaTime));
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

      //handle particle
      this.particles.forEach((particle) => particle.update());
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );

      if (this.particles.length > this.maxParticles)
        this.particles.length = this.maxParticles;

      // handle collisions
      this.collisions.forEach((collision) => collision.update(deltaTime));
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );

      //handle floating message
      this.floatingMessages.forEach((message) => message.update(deltaTime));

      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markedForDeletion
      );
    }

    draw(context) {
      this.background.draw(context);
      this.enemies.forEach((enemy) => enemy.draw(context));
      this.particles.forEach((particle) => particle.draw(context));
      this.collisions.forEach((collision) => collision.draw(context));
      this.player.draw(context);
      this.floatingMessages.forEach((message) => message.draw(context));
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0) {
        Math.random() < 0.5
          ? this.enemies.push(new GroundEnemy(this))
          : this.enemies.push(new ClimbingEnemy(this));
      }
      this.enemies.push(new FlyingEnemy(this));
    }
    reset() {
      this.player.x = 0;
      this.player.y = this.game.height - this.height - this.game.groundMargin;
    }
  }
  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  function animate(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(lastTime);
});
