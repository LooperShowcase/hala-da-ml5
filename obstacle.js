class obstacle {
  constructor() {
    this.size = 65;
    this.x = width;
    this.y = height - this.size;
  }
  show() {
    image(obstacleImage, this.x, this.y, this.size, this.size);
  }
  move() {
    this.x -= 10;
  }
}
