class Signpost extends GameObject {
    constructor(config) {
        config.currentAnimation = 'idle-0'
        config.animations = {
            'idle-0': [[0, 0]]
        }
        config.nonObstructive = true

        if (!config.src) config.src = "images/characters/signpost.png"

        super(config)
        this.sprite.setAnimation("idle-0")

        console.log(this.voice)
        this.talking = config.talking || [
            {
                events: [
                    { type: 'textMessage', text: "This sign doesn't say anything interesting.", voice: 'narrator' },
                ]
            },
        ]
    }
}