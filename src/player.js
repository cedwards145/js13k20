import { Character } from "./character";
import { isKeyDown } from "./input";

class Player extends Character{
    constructor(x, y) {
        super(x, y, 0);
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