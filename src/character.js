import { Conversation } from "./conversation";

const SPRITES_PER_ROW = 6;
const SPRITE_SIZE = 24;
const FIRST_SPRITE_Y = 112;

class Character {
    constructor(game, x, y, name, spriteIndex) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.name = name;
        this.width = 24;
        this.height = 24;
        
        this.spriteIndex = spriteIndex;
    }

    update() {}

    getOpeningConversation() { }

    askAboutCharacter(character) { }

    draw(context, tileset) {
        const spriteX = (this.spriteIndex % SPRITES_PER_ROW) * SPRITE_SIZE;
        const spriteY = FIRST_SPRITE_Y + (Math.floor(this.spriteIndex / SPRITES_PER_ROW) * SPRITE_SIZE);
        
        context.fillStyle = "rgb(255, 255, 255)";
        context.drawImage(tileset,
                          spriteX, spriteY, SPRITE_SIZE, SPRITE_SIZE,
                          this.x, this.y, SPRITE_SIZE, SPRITE_SIZE);
    }
}

class Thog extends Character {
    constructor(game, x, y) {
        super(game, x, y, "Thog", 1);
    }

    getOpeningConversation() {
        return new Conversation(this.game, [
            "Thog:\nMe Thog, who you?",
            "Player:\nI'm the player, I'm a detective",
            "Thog\nDetective? Thog no know that word",
            "Player:\n..."
        ]);
    }

    askAboutCharacter(character) {
        if (character === this) {
            return new Conversation(this.game, [
                "Thog:\nThog leader of Tribe. Thog lived in Forest all Thog's life."
            ]);
        }
    }
}

export { Character, Thog };