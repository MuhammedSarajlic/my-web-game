import { PlayerClient } from './entities/player';
import { BoundaryManager } from './managers/boundary';
import { CameraManager } from './managers/camera';
import { InputManager } from './managers/input';
import { MapManager } from './managers/map';

export class GameClient {
  private ctx: CanvasRenderingContext2D;
  private mapManager: MapManager;
  private player: PlayerClient;
  private inputManager: InputManager;
  private cameraManager: CameraManager;
  private boundaryManager: BoundaryManager;
  private lastTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.mapManager = new MapManager();
    this.cameraManager = new CameraManager(this.ctx);
    this.inputManager = new InputManager();
    this.boundaryManager = new BoundaryManager();
    this.player = new PlayerClient(this.inputManager, this.boundaryManager);
    this.setupCanvas();
  }

  private setupCanvas(): void {
    this.ctx.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.ctx.canvas.height = window.innerHeight * window.devicePixelRatio;
    this.ctx.canvas.style.width = `${window.innerWidth}px`;
    this.ctx.canvas.style.height = `${window.innerHeight}px`;

    this.ctx.imageSmoothingEnabled = false;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  private clearCanvas(): void {
    const { width, height } = this.ctx.canvas;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.restore();
  }

  public start(): void {
    this.loop();
  }

  private loop(currentTime: number = 0): void {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.render();
    this.player.update(deltaTime);
    this.cameraManager.translateTo(this.player.getPosition());

    requestAnimationFrame((time) => this.loop(time));
  }

  private render(): void {
    this.clearCanvas();
    this.mapManager.render(this.ctx);
    this.boundaryManager.render(this.ctx);
    this.player.render(this.ctx);
  }
}
