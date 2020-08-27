import { isKeyDown, isKeyPressed } from "./input";
import { TileMap } from "./map";
import testmap from "./testmap.json";
import { Character, Thog } from "./character";
import { Player } from "./player";
import { Conversation } from "./conversation";
import { Choice } from "./choice";
import { InteractMenu } from "./interact";

const INTERACT_DISTANCE = 16;

class Game {
    constructor(canvas, tileset) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        
        this.scalingFactor = 3;
        
        this.context.imageSmoothingEnabled = false;
        this.tileset = tileset;

        this.map = new TileMap(testmap);
        this.characters = [];

        this.player = new Player(this, 32, 88);
        
        this.characters.push(this.player);
        this.characters.push(new Character(150, 88, "Thog", 1));

        this.characters.push(new Thog(this, 150, 88));
        /*
        this.characters.push(new Character(200, 88, "Knight", 2, "Message 2"));
        this.characters.push(new Character(250, 88, "Wizard",  3, "Message 3"));
        this.characters.push(new Character(300, 88, "Princess", 4, "Message 4"));
        */

        this.menu = null;
    }

    canvasWidth() {
        return this.canvas.width / this.scalingFactor;
    }

    canvasHeight() {
        return this.canvas.height / this.scalingFactor;
    }

    clearMenu() {
        this.menu = null;
    }

    update() {
        this.map.update();

        if (this.menu) {
            this.menu.update();
        }
        else {
            for (let index = 0; index < this.characters.length; index++) {
                const character = this.characters[index];
                character.update();
            }

            if (isKeyPressed(69)) {
                const closestCharacter = this.getClosestCharacterToPlayer();
                const distance = Math.abs(closestCharacter.x - this.player.x);
    
                if (distance <= INTERACT_DISTANCE) {
                    const conversation = closestCharacter.getOpeningConversation();
                    conversation.onComplete = () => {
                        this.menu = new InteractMenu(this, closestCharacter);
                    };

                    this.menu = conversation;
                }
            }
        }
    }

    draw() {
        this.context.scale(this.scalingFactor, this.scalingFactor);
        
        this.context.fillStyle = "rgb(100, 149, 237)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.map.draw(this.context, this.tileset);
        
        for (let index = 0; index < this.characters.length; index++) {
            const character = this.characters[index];
            character.draw(this.context, this.tileset);
        }

        this.drawPrompt();

        if (this.menu) {
            this.menu.draw(this.context);
        }

        this.context.resetTransform();
    }

    drawPrompt() {
        const closestCharacter = this.getClosestCharacterToPlayer();
        const distance = Math.abs(closestCharacter.x - this.player.x);

        if (distance <= INTERACT_DISTANCE) {
            const interactX = closestCharacter.x + (closestCharacter.width / 2);
            const interactY = closestCharacter.y - 10;
    
            this.context.fillStyle = "rgb(0, 0, 0)";
            this.context.beginPath();
            this.context.moveTo(interactX - 4, interactY - 4);
            this.context.lineTo(interactX + 4, interactY - 4);
            this.context.lineTo(interactX + 4, interactY + 4);
            this.context.lineTo(interactX + 2, interactY + 4);
            this.context.lineTo(interactX, interactY + 6);
            this.context.lineTo(interactX - 2, interactY + 4);
            this.context.lineTo(interactX - 4, interactY + 4);
            this.context.fill();
    
            this.context.fillStyle = "rgb(255, 255, 255)";
            this.context.font = "8px sans";
            this.context.textAlign = "center";
            this.context.fillText("!", interactX, interactY + 3);
        }        
    }

    getClosestCharacterToPlayer() {
        // Can probably be replaced with an array function?
        let closestDistance = Number.POSITIVE_INFINITY;
        let closest = null;

        for (let index = 0; index < this.characters.length; index++) {
            const character = this.characters[index];
            
            if (character === this.player) {
                continue;
            }
            
            const distance = Math.abs(character.x - this.player.x);

            if (distance <= closestDistance) {
                closestDistance = distance;
                closest = character;
            }
        }

        return closest;
    }
}

export { Game };