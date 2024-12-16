export class InputManager {
  private keys: Set<string> = new Set();

  constructor() {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.key.toLowerCase());
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
  }

  isKeyPressed(key: string): boolean {
    return this.keys.has(key.toLowerCase());
  }

  getMovement(): { dx: number; dy: number } {
    let dx = 0;
    let dy = 0;

    if (this.isKeyPressed('a')) dx -= 1;
    if (this.isKeyPressed('d')) dx += 1;
    if (this.isKeyPressed('w')) dy -= 1;
    if (this.isKeyPressed('s')) dy += 1;

    // Optional: Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071; // approximately 1 / sqrt(2)
      dy *= 0.7071;
    }

    return { dx, dy };
  }
}
