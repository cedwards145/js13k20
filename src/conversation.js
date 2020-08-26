import { Menu } from "./menu";
import { isKeyPressed } from "./input";

class Conversation extends Menu {
    constructor(game, messages) {
        super(game);
        this.messages = messages;
        this.messageIndex = 0;
        this.characterIndex = 0;

        this.width = 300;
        this.height = 64;
    }

    update() {
        if (this.characterIndex < this.messages[this.messageIndex].length) {
            this.characterIndex++;
            
            if (isKeyPressed(69)) {
                this.characterIndex = this.messages[this.messageIndex].length - 1;
            }
        }
        else {
            if (isKeyPressed(69)) {
                this.messageIndex++;
                this.characterIndex = 0;

                if (this.messageIndex === this.messages.length) {
                    this.messageIndex = 0;
                    this.game.clearMenu();
                }
            }
        }
    }

    draw(context) {
        const x = (this.game.canvasWidth() - this.width) / 2;
        const y = this.game.canvasHeight() - this.height - 16;

        context.fillStyle = "rgb(0, 0, 0)";
        context.fillRect(x, y, this.width, this.height);

        context.fillStyle = "rgb(255, 255, 255)";
        context.font = "8px sans";
        context.textAlign = "left";
        context.fillText(this.messages[this.messageIndex].substring(0, this.characterIndex), x, y);
    }
}

export { Conversation };