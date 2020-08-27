const { Choice } = require("./choice");

class InteractMenu extends Choice {
    constructor(game, character) {
        super(game);
        this.character = character;
    }

    getChoices() {
        return [{ 
                choice: "Ask about " + this.character.name, 
                action: () => { 
                    this.playConversation(this.character.askAboutCharacter(this.character));
                } 
            }, {
                choice: "Ask about Forest",
                action: () => {}
            }, {
                choice: "Ask about missing book",
                action: () => {}
            }, { 
                choice: "Nothing", 
                action: () => { 
                    this.close(); 
                } 
            }
        ];
    }

    playConversation(conversation) {
        this.close(); 
        conversation.onComplete = () => {
            this.game.menu = this;
        };
        this.game.menu = conversation;        
    }
}

export { InteractMenu };