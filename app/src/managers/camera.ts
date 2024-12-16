export class CameraManager {
  private ctx: CanvasRenderingContext2D;
  private position = { x: 0, y: 0 };
  private targetPosition = { x: 0, y: 0 };
  private scale = 2;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  getPosition() {
    return this.position;
  }

  setScale(scale: number): void {
    this.scale = scale;
  }

  translateTo(position: { x: number; y: number }) {
    this.targetPosition = position;

    this.position.x += this.targetPosition.x - this.position.x;
    this.position.y += this.targetPosition.y - this.position.y;

    const canvas = this.ctx.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    this.ctx.setTransform(
      this.scale,
      0,
      0,
      this.scale,
      Math.round(centerX - this.position.x * this.scale),
      Math.round(centerY - this.position.y * this.scale)
    );
  }
}
