class Terminal extends GameObject {
    constructor(config) {
        config.currentAnimation = 'idle-0'
        config.animations = {
            'idle-0': [[0, 0]]
        }
        // config.nonObstructive = true

        if (!config.src) config.src = "images/props/terminal.png"

        super(config)
        this.sprite.setAnimation("idle-0")

        this.talking = config.talking || [
            {
                events: [
                    { type: 'textMessage', text: "This terminal has nothing interesting to contribute.", voice: 'narrator' },
                ]
            },
        ]
    }
}