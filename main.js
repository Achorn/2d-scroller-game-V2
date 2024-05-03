import { Player } from "./player";
window.addEventListener("load", () => {
  console.log("loaded");
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
    }
    update() {}
    draw() {}
  }
});
