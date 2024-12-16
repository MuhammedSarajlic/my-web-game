import { TILE_SIZE, TILES_IN_ROW } from '../constants';

export const renderMap = (
  map,
  ctx,
  canvasWidth,
  canvasHeight,
  tilesetImage
) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tileType = map[row][col];
      const yTile = Math.floor(tileType / TILES_IN_ROW);
      const xTile = (tileType % TILES_IN_ROW) - 1;

      if (tileType > 0) {
        ctx.drawImage(
          tilesetImage,
          xTile * TILE_SIZE,
          yTile * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE,
          col * TILE_SIZE,
          row * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }
  }
};
