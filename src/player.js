import { Character } from "./character";
import { isKeyDown } from "./input";

class Player extends Character{
    constructor(game, x, y) {
        super(game, x, y, "Player", 0);
    }

    update() {
        if (isKeyDown(65)) {
            this.x -= 2;
        }
        
        if (isKeyDown(68)) {
            this.x += 2;
        }
    }
}

export { Player };