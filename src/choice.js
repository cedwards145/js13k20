import { Menu } from "./menu";
import { isKeyPressed } from "./input";

class Choice extends Menu {
    constructor(game) {
        super(game);

        this.height = 16;
        this.padding = 8;
        this.width = 100;

        this.index = 0;
    }

    getChoices() {
        return [];
    }

    update() {
        const choices = this.getChoices();

        if (isKeyPressed(87)) {
            this.index = (this.index - 1 < 0 ? choices.length - 1 : this.index - 1);
        }
        else if (isKeyPressed(83)) {
            this.index = (this.index + 1) % choices.length;
        }
        else if (isKeyPressed(69)) {
            choices[this.index].action();
        }
    }

    draw(context) {
        const choices = this.getChoices();
        const startY = (this.game.canvasHeight() - ((this.height + this.padding) * choices.length)) / 2;

        for (let choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) {
            let x = 16;
            const y = startY + (choiceIndex * (this.height + this.padding));

            if (choiceIndex === this.index) {
                x *= 2;
            }
            
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillRect(x, y, this.width, this.height);
    
            context.fillStyle = "rgb(255, 255, 255)";
            context.font = "8px sans";
            context.textAlign = "left";
            context.fillText(choices[choiceIndex].choice, x + 4, y + 10);
        }
    }

    close() {
        this.game.menu = null;
    }
}

export { Choice };