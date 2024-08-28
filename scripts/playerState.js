class PlayerState {
    constructor() {
        this.name = ''
        this.pronouns = ''
        this.hp = 5
        this.storyFlags = {
            // TALKED_TO_ERIO: true
        }
    }
}

window.playerState = new PlayerState()