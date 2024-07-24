class Person extends GameObject {
    constructor(config) {
        super(config)
        this.movingProgressRemaining = 0
        this.isStanding = false

        this.isPlayerControlled = config.isPlayerControlled || false

        this.directionUpdate = {
            "up": ['y', -1],
            "down": ['y', 1],
            "left": ['x', -1],
            "right": ['x', 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition()
        } else {

            // More cases for starting to walk will come here
            //
            //

            // Case: We're keyboard ready and have an arrow pressed
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehaviour(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state)
        }
    }

    startBehaviour(state, behaviour) {
        // Set character direction to whatever behaviour has
        this.direction = behaviour.direction

        if (behaviour.type == "walk") {
            // Stop here if space not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                behaviour.retry && setTimeout(() => {
                    this.startBehaviour(state, behaviour)
                },10)
                return
            }

            // Ready to walk!
            state.map.moveWall(this.x, this.y, this.direction)
            this.movingProgressRemaining = GAME_GRID_SIZE
            this.updateSprite(state)
        }

        if (behaviour.type === "stand") {
            this.isStanding = true
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
                this.isStanding = false
            }, behaviour.time)
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change
        this.movingProgressRemaining -= 1

        if (this.movingProgressRemaining === 0) {
            // Finished the walk
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction)
            return
        }
        this.sprite.setAnimation("idle-" + this.direction)

    }
}