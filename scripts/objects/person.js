class Person extends GameObject {
    constructor(config) {
        super(config)
        this.movingProgressRemaining = 0
        this.isStanding = false
        this.animation = null
        this.voice = config.voice || null
        this.intentPosition = null
        this.skipMovement = false

        this.isPlayerControlled = config.isPlayerControlled || false

        this.directionUpdate = {
            "up": ['y', -1],
            "down": ['y', 1],
            "left": ['x', -1],
            "right": ['x', 1],
        }
    }

    // MARK: update
    update(state) {
        super.update(state)
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

    // MARK: startBehaviour
    startBehaviour(state, behaviour) {
        if (!this.isMounted) {
            return
        }

        if (behaviour.skip) this.skipMovement = true
        // Set character direction to whatever behaviour has
        this.direction = behaviour.direction

        if (behaviour.type == "backstep" || behaviour.type == "walk") {
            // Stop here if space not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                behaviour.retry && setTimeout(() => {
                    this.startBehaviour(state, behaviour)
                }, 10)
                return
            }

            // Ready to walk!
            const intentPosition = utils.nextPosition(this.x, this.y, this.direction)
            this.intentPosition = [
                intentPosition.x,
                intentPosition.y
            ]
            
            this.movingProgressRemaining = GAME_GRID_SIZE

            this.animation = behaviour.type
            this.updateSprite()
            if (!this.skipMovement) {
                new AudioManager().playSFX('walk')
            }
        }

        if (behaviour.type === "stand") {
            this.isStanding = true
            this.animation = null
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
                this.isStanding = false
            }, behaviour.time)
        }
    }

    // MARK: updatePosition
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]

        // If cutscenes are being skipped, movement needs to be instantaneous
        if (this.skipMovement) {
            while (this.movingProgressRemaining > 0) {
                this[property] += change
                this.movingProgressRemaining -= 1
            }
            this.skipMovement = false
        } else {
            this[property] += change
            this.movingProgressRemaining -= 1
        }

        if (this.movingProgressRemaining === 0) {
            // Finished the walk
            this.intentPosition = null
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
    }

    // MARK: flipDirection
    flipDirection(direction) {
        switch (direction) {
            case 'down': return 'up'
            case 'up': return 'down'
            case 'right': return 'left'
            case 'left': return 'right'
        }
    }

    // MARK: updateSprite
    updateSprite(state) {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation(this.animation + "-" + this.direction)
        } else {
            if (this.animation == 'backstep') {
                this.sprite.setAnimation("idle-" + this.flipDirection(this.direction))
            } else {
                this.sprite.setAnimation("idle-" + this.direction)
            }
        }
    }
}