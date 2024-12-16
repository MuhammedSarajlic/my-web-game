import { converDataToMap } from '../utils/convertJsonTo2dArray';
import boundaryMapData from '../map/colliderMap.json';
import boundaryTile from '../assets/collider.png';
import { Hitbox } from './physics';

export class BoundaryManager {
  private readonly tileSize = 32;
  private map: number[][] | null = null;
  private readonly tileSheet = new Image();
  private readonly boundaryArr: Hitbox[] = [];

  constructor() {
    this.tileSheet.src = boundaryTile;
    this.setMap(converDataToMap(boundaryMapData, 1));
    this.setBoundaryArr();
  }

  setMap(map: number[][]) {
    this.map = map;
  }

  getBoundayArr() {
    return this.boundaryArr;
  }

  setBoundaryArr() {
    this.map?.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell == 65) {
          this.boundaryArr.push({
            x: j * this.tileSize,
            y: i * this.tileSize,
            width: this.tileSize,
            height: this.tileSize,
          });
        }
      });
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    this.map?.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell == 65) {
          ctx.fillStyle = 'rgba(255,255,255, 0)';
          ctx.fillRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      });
    });
  }
}
