export function converDataToMap(mapData, layerIdx: number) {
  let map2D = [];
  const layer = mapData.layers[layerIdx];
  const tiles = layer.data;

  for (let row = 0; row < mapData.height; row++) {
    let tileRow = [];
    for (let col = 0; col < mapData.width; col++) {
      const tile = tiles[row * mapData.height + col];
      tileRow.push(tile);
    }
    map2D.push(tileRow);
  }

  return map2D;
}
