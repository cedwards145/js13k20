const SPRITES_PER_ROW = 6;
const SPRITE_SIZE = 24;
const FIRST_SPRITE_Y = 112;

class Character {
    constructor(x, y, spriteIndex, openingConversation=null) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        
        this.spriteIndex = spriteIndex;
        this.openingConversation = openingConversation;
    }

    update() {}

    draw(context, tileset) {
        const spriteX = (this.spriteIndex % SPRITES_PER_ROW) * SPRITE_SIZE;
        const spriteY = FIRST_SPRITE_Y + (Math.floor(this.spriteIndex / SPRITES_PER_ROW) * SPRITE_SIZE);
        
        context.fillStyle = "rgb(255, 255, 255)";
        context.drawImage(tileset,
                          spriteX, spriteY, SPRITE_SIZE, SPRITE_SIZE,
                          this.x, this.y, SPRITE_SIZE, SPRITE_SIZE);
    }
}

export { Character };