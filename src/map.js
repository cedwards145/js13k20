const TILE_SIZE = 16;
const TILESET_WIDTH = 10;

class TileMap {
    constructor(mapData, tileset) {
        this.width = mapData.width;
        this.height = mapData.height;
        this.tileset = tileset;
        
        const layers = mapData.layers;
        this.tiles = layers[0].data;
    }

    update() { }

    draw(context) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const tile = this.tiles[x + y * this.width] - 1;
                const tileX = tile % TILESET_WIDTH;
                const tileY = Math.floor(tile / TILESET_WIDTH);

                context.drawImage(this.tileset,
                                  tileX * TILE_SIZE, tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE,
                                  x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

export { TileMap };