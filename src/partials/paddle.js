import { SVG_NS } from '../settings';

let paddleAcceleration = 0.5;

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 10;
      this.score = 0;

      document.addEventListener('keydown', event => {

        switch (event.key) {
          case up:
            this.up();
            break;
          case down:
            this.down();
            break;
        }
      });
    }//Constructor

    up() {
      this.y = this.y - this.speed;
      this.y = Math.max( 0, this.y - this.speed );
      {
        this.move(-paddleAcceleration);
      }
    }
  
    down() {
      this.y = this.y + this.speed;
      this.y = Math.min( this.boardHeight - this.height, this.y + this.speed );
      {
        this.move(paddleAcceleration);
      }
    }

    coordinates(x, y, width, height) {
      let leftX = x;
      let rightX = x + width;
      let topY = y;
      let bottomY = y + height;
      return [leftX, rightX, topY, bottomY];
    }

    render(svg) {
      let rect = document.createElementNS(SVG_NS, 'rect');
      rect.setAttributeNS(null, 'fill', 'white');
      rect.setAttributeNS(null, 'width', this.width);
      rect.setAttributeNS(null, 'height', this.height);
      rect.setAttributeNS(null, 'x', this.x); // x of the top left corner
      rect.setAttributeNS(null, 'y', this.y); // y of the top left corner
      svg.appendChild(rect);
    }

    move(force) {
      this.speed += force;
    }
  
    update() {
      if (this.y + this.speed <= 0) {
        this.againstTopEdge = true;
        this.speed = -this.speed * 0.5;
      } else if (this.y + this.speed >= this.boardHeight - this.height) {
        this.againstBotEdge = true;
        this.speed = -this.speed * 0.5;
      } else {
        this.againstBotEdge = false;
        this.againstTopEdge = false;
        this.y += this.speed;
      }
      this.slowToZero();
    }
  
    slowToZero() {
      if (this.speed > 0) {
        this.speed -= 0.05;
      } else if (this.speed < 0) {
        this.speed += 0.05;
      }
    }

  }
