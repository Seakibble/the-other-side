class Console extends GameObject {
    constructor(config) {
        config.renderLevel = config.renderLevel || 6
        config.currentAnimation = 'idle-0'
        config.animations = {
            'idle-0': [
                [0, 0],
                [0, 0], [1, 0],
                [0, 0], [4, 0],
                [0, 0], [2, 0],
                [0, 0], [5, 0],
                [0, 0], [3, 0],
                [0, 0], [0, 0],
                [0, 0], [4, 0],
                [0, 0], [0, 0],
                [0, 0], [5, 0],
                [0, 0], [6, 0]
            ]
        }

        config.useShadow = config.useShadow || false
        config.noBump = true
        
        // config.nonObstructive = true
        if (!config.src) config.src = "images/props/console.png"

        super(config)
        this.sprite.setAnimation("idle-0")

        this.talking = config.talking || [
            {
                events: [
                    { type: 'textMessage', text: "The console bleeps pleasantly. Or perhaps it's swearing at you.", voice: 'narrator' },
                ]
            },
        ]
    }
}