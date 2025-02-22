class Prop extends GameObject {
    constructor(config) {
        config.renderLevel = config.renderLevel || 6
        config.currentAnimation = 'idle-0'
        config.animations = {
            'idle-0': [[0, 0]]
        }

        config.useShadow = config.useShadow || false
        config.bump = config.bump || false
        
        // config.nonObstructive = true

        if (config.src) {
            config.src = "images/props/" + config.src + ".png"
        } else {
            config.src = "images/characters/railing-down.png"
        }

        super(config)
        this.sprite.setAnimation("idle-0")

        this.talking = config.talking || [
            {
                events: [
                    { },
                ]
            },
        ]
    }
}