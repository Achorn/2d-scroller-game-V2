class Layer {
  constructor(game, width, height, speedModifier, image, blur) {
    this.blur = blur || 0;
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.width) {
      let dif = this.x + this.width;
      this.x = dif;
    }
    this.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    // context.save();
    // context.filter = `blur(${this.blur}px)`;
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
    // context.restore();
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1image = document.getElementById("layer1");
    this.layer2image = document.getElementById("layer2");
    this.layer3image = document.getElementById("layer3");
    this.layer4image = document.getElementById("layer4");
    this.layer5image = document.getElementById("layer5");

    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0.3,
      this.layer1image,
      8
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.6,
      this.layer2image,
      4
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.9,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer5image
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}
