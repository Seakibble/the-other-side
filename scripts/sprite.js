class Sprite {
    constructor(config) {
        // Set up the image
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }

        // Shadow
        this.shadow = new Image()
        this.useShadow = config.useShadow || false
        if (this.useShadow) {
            this.shadow.src = 'images/characters/shadow.png'
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true
        }
        

        // Configure Animation and Initial State
        this.animations = config.animations || {
            'idle-down':    [[0, 0]],
            'idle-right':   [[0, 1]],
            'idle-up':      [[0, 2]],
            'idle-left':    [[0, 3]],
            'walk-down':    [[1, 0], [0, 0], [3, 0], [0, 0]],
            'walk-right':   [[1, 1], [0, 1], [3, 1], [0, 1]],
            'walk-up':      [[1, 2], [0, 2], [3, 2], [0, 2]],
            'walk-left': [[1, 3], [0, 3], [3, 3], [0, 3]],
            'backstep-up': [[1, 0], [0, 0], [3, 0], [0, 0]],
            'backstep-left': [[1, 1], [0, 1], [3, 1], [0, 1]],
            'backstep-down': [[1, 2], [0, 2], [3, 2], [0, 2]],
            'backstep-right': [[1, 3], [0, 3], [3, 3], [0, 3]],
        }
        this.currentAnimation = config.currentAnimation || "idle-down"
        this.currentAnimationFrame = 0

        this.animationFrameLimit = config.animationFrameLimit || 6
        this.animationFrameProgress = this.animationFrameLimit

        // Reference the game object
        this.gameObject = config.gameObject
    }


    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    // MARK: setAnimation
    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key
            this.currentAnimationFrame = 0
            this.animationFrameProgress = this.animationFrameLimit
        }
    }

    // MARK: updateAnimationProgress
    updateAnimationProgress() {
        // Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1
            return
        }

        // Reset counter
        this.animationFrameProgress = this.animationFrameLimit

        // Uptick animation frame
        this.currentAnimationFrame += 1
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0
        }
    }

    // MARK: draw
    draw(ctx, cameraPerson) {
        const x = this.gameObject.x + SPIRTE_OFFSET_X + utils.withGrid(SCREEN_CENTER_X) - cameraPerson.x
        const y = this.gameObject.y + SPIRTE_OFFSET_Y + utils.withGrid(SCREEN_CENTER_Y) - cameraPerson.y

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        const [frameX, frameY] = this.frame
        this.isLoaded && ctx.drawImage(
            this.image,
            frameX * SPRITE_GRID_SIZE, frameY * SPRITE_GRID_SIZE,
            SPRITE_GRID_SIZE, SPRITE_GRID_SIZE,
            x, y,
            SPRITE_GRID_SIZE, SPRITE_GRID_SIZE
        )

        this.updateAnimationProgress()
    }    
}