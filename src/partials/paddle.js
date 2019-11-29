import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.keyUp = up;
    this.keyDown = down;
    this.speed = 10;
    this.score = 0;

    this.player = player;
    this.keyState = {};

    document.addEventListener(
      "keydown",
      event => {
        this.keyState[event.key || event.which] = true;
      },
      true
    );

    document.addEventListener(
      "keyup",
      event => {
        this.keyState[event.key || event.which] = false;
      },
      true
    );
  } // constructor

  up() {
    // get the max number...
    // either 0 or the y position minus speed
    this.y = Math.max(0, this.y - this.speed);
  }

  down() {
    // get the min number...
    // either the height of the board minus the height of the paddle
    // or the y position plus the speed
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  render(svg) {
    // Player movement
    if (this.keyState[this.keyUp] && this.player === "player1") {
      this.up();
    }
    if (this.keyState[this.keyDown] && this.player === "player1") {
      this.down();
    }
    if (this.keyState[this.keyUp] && this.player === "player2") {
      this.up();
    }
    if (this.keyState[this.keyDown] && this.player === "player2") {
      this.down();
    }

    let rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttributeNS(null, "fill", "white");
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "x", this.x); // x of the top left corner
    rect.setAttributeNS(null, "y", this.y); // y of the top left corner
    svg.appendChild(rect);
  }
}
