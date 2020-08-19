import { isKeyDown } from "./input";
import { TileMap } from "./map";
import testmap from "./testmap.json";

class Game {
    constructor(canvas, tileset) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.tileset = tileset;

        this.map = new TileMap(testmap, tileset);

        this.player = {
            x: 50,
            y: 128,
            width: 32,
            height: 32
        };
    }

    update() {
        this.map.update();

        if (isKeyDown(65)) {
            this.player.x -= 2;
        }
        
        if (isKeyDown(68)) {
            this.player.x += 2;
        }
    }

    draw() {
        this.context.fillStyle = "rgb(100, 149, 237)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.map.draw(this.context);

        this.context.fillStyle = "rgb(255, 255, 255)";
        this.context.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }
}

export { Game };