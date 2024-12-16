import { PLAYER_SIZE } from '../constants';
import { playerIdle, playerDown } from '../assets';

export class AnimationManager {
  private currentFrame = 0;
  private frameTimer = 0;
  private readonly frameInterval = 150;
  private isMoving = false;
  private image = new Image();

  constructor() {
    this.image.src = playerIdle;
  }

  getImage() {
    return this.image;
  }

  setImage(image: string) {
    this.image.src = image;
  }

  getCurrentFrame() {
    return this.currentFrame;
  }

  animate(deltaTime: number, dx: number, dy: number) {
    this.isMoving = dx !== 0 || dy !== 0;

    if (this.isMoving) {
      this.image.src = playerDown;
    } else {
      this.image.src = playerIdle;
    }

    const frameCount = this.isMoving ? 6 : 4;

    this.frameTimer += deltaTime;
    if (this.frameTimer >= this.frameInterval) {
      this.currentFrame = (this.currentFrame + 1) % frameCount;
      this.frameTimer = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D, position: { x: number; y: number }) {
    ctx.drawImage(
      this.image,
      this.getCurrentFrame() * PLAYER_SIZE,
      0,
      PLAYER_SIZE,
      PLAYER_SIZE,
      position.x,
      position.y,
      PLAYER_SIZE,
      PLAYER_SIZE
    );
  }
}
