import playerImage from '../assets/D_Idle.png';
import playerWalk from '../assets/D_Walk.png';
import { PLAYER_SIZE, TILE_SIZE } from '../constants';
import { AnimationManager } from '../managers/animation';
import { BoundaryManager } from '../managers/boundary';
import { InputManager } from '../managers/input';
import { Hitbox, isColliding } from '../managers/physics';
import { Direction } from '../utils/direction';

export class PlayerClient {
  private position = { x: 200, y: 200 };
  private facing = Direction.Down;
  private readonly speed = 3;
  private readonly image = new Image();
  private readonly inputManager: InputManager;
  private readonly animationManager: AnimationManager;
  private readonly hitbox: Hitbox;
  private readonly boundaryManager: BoundaryManager;

  constructor(inputManager: InputManager, boundaryManager: BoundaryManager) {
    this.image.src = playerImage;
    this.inputManager = inputManager;
    this.animationManager = new AnimationManager();
    this.animationManager.setImage(playerImage);
    this.boundaryManager = boundaryManager;
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

  handleCollision(playerX: number, playerY: number): boolean {
    let collisionArr = this.boundaryManager.getBoundayArr();

    for (const element of collisionArr) {
      if (
        Math.abs(element.x - playerX) <= TILE_SIZE &&
        Math.abs(element.y - playerY) <= TILE_SIZE
      ) {
        return isColliding(this.getHitbox(), element);
      }
    }
    return false;
  }

  handleMovement(dx: number, dy: number) {
    const previousX = this.position.x;
    const previousY = this.position.y;

    this.position.x += dx * this.speed;
    this.hitbox.x = this.position.x;

    if (this.handleCollision(this.position.x, this.position.y)) {
      console.log('this happend');
      this.position.x = previousX;
    }

    this.position.y += dy * this.speed;
    this.hitbox.y = this.position.y;

    if (this.handleCollision(this.position.x, this.position.y)) {
      console.log('this happend 2');
      this.position.y = previousY;
    }
  }

  update(deltaTime: number) {
    const { dx, dy } = this.inputManager.getMovement();
    this.handleMovement(dx, dy);

    this.animationManager.animate(deltaTime, dx, dy);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.animationManager.render(ctx, this.getPosition());
  }
}
