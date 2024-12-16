import tilesImage from '../assets/FieldsTileset.png';
import { converDataToMap } from '../utils/convertJsonTo2dArray';
import mapData from '../map/testMap1.json';

export class MapManager {
  private readonly tileSize = 32;
  private readonly tilesInRow = 8;
  private map: number[][] | null = null;
  private readonly tileSheet = new Image();

  constructor() {
    this.tileSheet.src = tilesImage;
    this.setMap(converDataToMap(mapData, 0));
  }

  setMap(map: number[][]) {
    this.map = map;
  }

  render(ctx: CanvasRenderingContext2D) {
    this.map?.forEach((row, y) => {
      row.forEach((cell, x) => {
        const tileType = this.map[y][x];
        const yTile = Math.floor(tileType / this.tilesInRow);
        const xTile = (tileType % this.tilesInRow) - 1;
        if (tileType > 0) {
          ctx.drawImage(
            this.tileSheet,
            xTile * this.tileSize,
            yTile * this.tileSize,
            this.tileSize,
            this.tileSize,
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
