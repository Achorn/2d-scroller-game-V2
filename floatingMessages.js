export class FloatingMessage {
  constructor(value, x, y, color) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.color = color;
    this.markedForDeletion = false;
    this.timer = 0;
  }
  update(deltaTime) {
    this.x += 0.01 * deltaTime;
    this.y += Math.cos(this.timer * 0.05 + 0.5) * 3 * -1;
    this.timer += 0.1 * deltaTime;
    if (this.timer > 100) this.markedForDeletion = true;
  }
  draw(context) {
    context.save();
    context.globalAlpha = 1 - this.timer / 100;
    context.font = "40px DM Serif Display";
    context.fillStyle = "black";
    context.fillText(this.value, this.x, this.y);
    context.fillStyle = this.color;

    context.fillText(this.value, this.x + 2, this.y + 2);
    context.restore();
  }
}
