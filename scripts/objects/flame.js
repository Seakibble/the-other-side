class Flame extends GameObject {
    constructor(config) {
        config.currentAnimation = 'flicker-0'
        config.animations = {
            'flicker-0': [[0, 0]],
            'flicker-1': [[1, 0]],
            'flicker-3': [[0, 1]],
            'flicker-2': [[1, 1]],
        }

        if (!config.src) config.src = "images/characters/flame.png"
        if (!config.shadow) config.shadow = false

        super(config)
        this.flickerTime = 10
        this.flickerTimeRemaining = Math.floor(Math.random()*this.flickerTime)
        this.flickerNumber = 0
        this.sprite.setAnimation("flicker-" + this.flickerNumber)


        this.talking = config.talking || [
            {
                excludes: ['TALKED_TO_FLAME'],
                events: [
                    { type: 'textMessage', text: "You stare into the flames, thinking about all the things you want to do with your short and pathetic life.", voice: 'narrator' },
                    { type: 'textMessage', text: "Wow, that's rude of you!", voice: 'hero' },
                    { type: 'textMessage', text: "Oops, you weren't supposed to hear that.", voice: 'narrator' },
                    { type: 'addStoryFlag', flag: "TALKED_TO_FLAME" },
                ]
            },
            {
                events: [
                    { type: 'textMessage', text: "You stare into the flames.", voice: 'narrator' },
                ]
            },
        ]
    }

    // MARK: update
    update() {
        this.updateSprite()
    }

    // MARK: updateSprite
    updateSprite(state) {
        if (this.flickerTimeRemaining == 0) {
            this.flickerNumber += 1
            if (this.flickerNumber >= Object.keys(this.sprite.animations).length) {
                this.flickerNumber = 0
            }

            this.sprite.setAnimation("flicker-" + this.flickerNumber)

            this.flickerTimeRemaining = this.flickerTime
        } else {
            this.flickerTimeRemaining -= 1
        }
    }
}