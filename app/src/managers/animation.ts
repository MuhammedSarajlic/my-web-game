import { PLAYER_SIZE } from '../constants';
import { PlayerClient } from '../entities/player';

export class AnimationManager {
  private currentFrame = 0;
  private readonly frameCount = 4;
  private frameTimer = 0;
  private readonly frameInterval = 150;
  private isMoving = false;
  private image;

  constructor() {
    this.image = new Image();
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

    if (!this.isMoving) {
      this.frameTimer += deltaTime;
      if (this.frameTimer >= this.frameInterval) {
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        this.frameTimer = 0;
      }
    } else {
      this.currentFrame = 0;
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
