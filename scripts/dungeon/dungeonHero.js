class DungeonHero extends DungeonObject {
    constructor(config) {
        super(config)
        this.id = 'hero'
        this.input = config.input

        this.jump = new Vector(0, -5)
        this.speed = 3
        this.drag = 0.4

        this.size.x = 12
        this.size.y = 22

        this.velocity = new Vector(0,0)

        this.downTouch = false
        this.down = new DungeonObject({
            pos: new Vector(0,0),
            size: new Vector(this.size.x, 1)
        })

        this.jumping = false
        this.color = 'dodgerblue'
    }

    applyInput() {
        if (this.input.up && this.grounded && !this.input.jumpLock) {
            this.grounded = false
            this.input.jumpLock = true
            this.jumping = true
            this.downTouch = null
            this.velocity.add(this.jump)
            new AudioManager().playSFX('dungeon/jump')
        } else if (!this.input.up && this.jumping && this.velocity.y < 0) {
            this.velocity.y = 0
        }

        if (this.input.right) {
            if (this.velocity.x < this.speed) this.velocity.x = this.speed
        } else if (this.input.left) {
            if (this.velocity.x > -this.speed) this.velocity.x = -this.speed
        } else {
            this.applyDrag()
        }
    }

    applyDrag() {
        this.velocity.x *= this.drag
    }
    
    land(other) {
        if (!this.grounded) {
            new AudioManager().playSFX('dungeon/land')
        }

        super.land(other)
        this.jumping = false
    }

    checkCollision(other) {
        let hit = super.checkCollision(other)

        let downCollision = this.down.checkCollision(other)


        if (downCollision && other.solid) {
            this.downTouch = other
        }

        return hit
    }
    update(){
        super.update()
        this.down.pos = new Vector(this.pos.x, this.pos.y + this.size.y + 1)
        
        if (!this.downTouch) {
            this.downTouch = null
            this.grounded = false
        } else {
            this.land(this.downTouch)
        }
        this.downTouch = false
    }

    respawn() {
        new AudioManager().playSFX('dungeon/respawn')
        this.pos.x = 0
        this.pos.y = 0
        this.velocity.y = 0
        this.velocity.y = 0
    }

    // update() {

    //     this.applyInput()

    //     super()
    // }


}