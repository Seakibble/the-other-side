class GameObject {
    constructor(config) {
        this.id = null
        this.isMounted = false
        this.x = config.x || 0
        this.y = config.y || 0

        this.nonObstructive = config.nonObstructive || false

        this.direction = config.direction || "down"

        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/people/hero.png",
            useShadow: config.useShadow || true,
            animations: config.animations
        })

        this.behaviourLoop = config.behaviourLoop || []
        this.behaviourLoopIndex = 0

        this.talking = config.talking || []
        this.retryTimeout = null
    }

    // MARK: mount
    mount(map) {
        this.isMounted = true
        // map.addWall(this.x, this.y)

        // If we have a behaviour, kick off after a short delay

        setTimeout(() => {
            this.doBehaviourEvent(map)
        }, 10)
    }

    // MARK: update
    update() {

    }

    // MARK: doBehaviourEvent
    async doBehaviourEvent(map) {
        if (this.behaviourLoop.length === 0) {
            return
        }

        if (map.isCutscenePlaying) {
            if (this.retryTimeout) {
                clearTimeout(this.retryTimeout)
            }
            this.retryTimeout = setTimeout(() => {
                this.doBehaviourEvent(map)
            }, 1000)
            return
        }

        // Setting up our event with relevant info
        let eventConfig = this.behaviourLoop[this.behaviourLoopIndex]
        eventConfig.who = this.id

        // Create an event instance out of our next event config
        const eventHandler = new OverworldEvent({ map, event: eventConfig })
        await eventHandler.init()

        // Setting the next event to fire
        this.behaviourLoopIndex += 1
        if (this.behaviourLoopIndex === this.behaviourLoop.length) {
            this.behaviourLoopIndex = 0
        }

        // Do it again
        this.doBehaviourEvent(map)
    }
}