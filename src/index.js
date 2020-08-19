const { Game } = require("./game");
const { keyDown, keyUp } = require("./input");

const canvas = document.getElementById("game");
const tileset = new Image();

window.onkeydown = keyDown;
window.onkeyup = keyUp;

function start() {
    const game = new Game(canvas, tileset);
    const run = () => {
        game.update();
        game.draw();

        window.requestAnimationFrame(run);
    }
    run();
}

tileset.onload = start();
tileset.src = "img/tileset.png";
