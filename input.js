export default class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "z") &&
        !this.keys.includes(e.key)
      ) {
        this.keys.push(e.key);
      }
      console.log(e.key, this.keys);
    });
    window.addEventListener("keyup", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "z") &&
        this.keys.includes(e.key)
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(e.key, this.keys);
    });
  }
}
