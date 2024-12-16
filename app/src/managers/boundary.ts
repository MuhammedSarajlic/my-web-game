import { converDataToMap } from '../utils/convertJsonTo2dArray';
import boundaryMapData from '../map/colliderMap.json';
import boundaryTile from '../assets/collider.png';
import { Hitbox } from './physics';
import { TILE_SIZE } from '../constants';

export class BoundaryManager {
  private tileSize = 32;
  private map: number[][] | null = null;
  private tileSheet = new Image();
  private boundaryArr: Hitbox[] = [];

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
    // this.map?.forEach((row, i) => {
    //   row.forEach((cell, j) => {
    //     this.boundaryArr.push({
    //       x: i * TILE_SIZE,
    //       y: j * TILE_SIZE,
    //       width: TILE_SIZE,
    //       height: TILE_SIZE,
    //     });
    //   });
    // });
    this.boundaryArr.push({
      x: 0,
      y: 0,
      width: TILE_SIZE,
      height: TILE_SIZE,
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 32, 32);
    // this.map.forEach((row, y) => {
    //   row.map((cell, x) => {
    //     if (cell > 0 && cell == 65) {
    //       this.setBoundaryArr({
    //         x: y,
    //         y: x,
    //         width: TILE_SIZE,
    //         height: TILE_SIZE,
    //       });
    //       ctx.drawImage(
    //         this.tileSheet,
    //         x * this.tileSize,
    //         y * this.tileSize,
    //         this.tileSize,
    //         this.tileSize
    //       );
    //     }
    //   });
    // });
  }
}
