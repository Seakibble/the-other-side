class Prop extends GameObject {
    constructor(config) {
        config.renderLevel = config.renderLevel || 6
        config.currentAnimation = 'idle-0'
        config.animations = {
            'idle-0': [[0, 0]]
        }

        config.useShadow = config.useShadow || false
        config.noBump = config.noBump || false
        
        // config.nonObstructive = true
        if (config.src && !config.src.includes('images')) {
            config.src = "images/props/" + config.src + ".png"
        } else if (config.src === null) {
            config.src = "images/props/null.png"
        } else if (!config.src) {
            config.src = "images/props/error.png"
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