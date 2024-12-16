import playerImage from '../assets/D_Idle.png';
import playerWalk from '../assets/D_Walk.png';
import { PLAYER_SIZE } from '../constants';
import { AnimationManager } from '../managers/animation';
import { BoundaryManager } from '../managers/boundary';
import { InputManager } from '../managers/input';
import { Hitbox, isColliding } from '../managers/physics';

export class PlayerClient {
  private position = { x: 0, y: 0 };
  private speed = 3;
  private image = new Image();
  private inputManager: InputManager;
  private animationManager: AnimationManager;
  private hitbox: Hitbox;
  private boundaryManager: BoundaryManager;

  constructor(inputManager: InputManager) {
    this.image.src = playerImage;
    this.inputManager = inputManager;
    this.animationManager = new AnimationManager();
    this.animationManager.setImage(playerImage);
    this.boundaryManager = new BoundaryManager();
    this.hitbox = {
      x: this.position.x,
      y: this.position.y,
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
    };
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: { x: number; y: number }) {
    this.position = position;
  }

  getHitbox() {
    return this.hitbox;
  }

  handleCollision(): boolean {
    let collisionArr = this.boundaryManager.getBoundayArr();
    for (const element of collisionArr) {
      if (
        element.x >= this.hitbox.x - 64 &&
        element.x <= this.hitbox.x + 64 &&
        element.y >= this.hitbox.y - 64 &&
        element.y <= this.hitbox.y + 64
      ) {
        return isColliding(this.getHitbox(), element);
      }
    }
    return false;
  }

  handleMovement(dx: number, dy: number) {
    //const { dx, dy } = this.inputManager.getMovement();
    const previousX = this.position.x;
    const previousY = this.position.y;

    this.position.x += dx * this.speed;
    this.hitbox.x = this.position.x;

    // if (nesto.isColliding()) {
    //   this.position.x = previousX;
    // }

    this.position.y += dy * this.speed;
    this.hitbox.y = this.position.y;

    // if (nesto.isColliding()) {
    //   this.position.y = previousY;
    // }
  }

  update(deltaTime: number) {
    const { dx, dy } = this.inputManager.getMovement();
    if (dx !== 0 || dy !== 0) {
      this.animationManager.setImage(playerImage);
    }
    if (dy == 1) {
      this.animationManager.setImage(playerWalk);
    }

    // this.position.x += dx * this.speed;
    // this.position.y += dy * this.speed;
    this.handleMovement(dx, dy);

    this.animationManager.animate(deltaTime, dx, dy);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.animationManager.render(ctx, this.getPosition());
    // ctx.drawImage(
    //   this.image,
    //   this.animationManager.getCurrentFrame() * PLAYER_SIZE,
    //   0,
    //   PLAYER_SIZE,
    //   PLAYER_SIZE,
    //   this.position.x,
    //   this.position.y,
    //   PLAYER_SIZE,
    //   PLAYER_SIZE
    // );
  }
}
