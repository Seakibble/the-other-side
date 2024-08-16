class DungeonHero extends DungeonObject {
    constructor(config) {
        super(config)
        this.id = 'hero'
        this.input = config.input

        this.jump = new Vector(0, -4)
        this.speed = 2

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
        } else if (!this.input.up && this.jumping && this.velocity.y < 0) {
            this.velocity.y = 0
        }

        if (this.input.right) {
            if (this.velocity.x < this.speed) this.velocity.x = this.speed
        } else if (this.input.left) {
            if (this.velocity.x > -this.speed) this.velocity.x = -this.speed
        }
    }
    
    land(other) {
        super.land(other)
        this.grounded = true
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

    // update() {

    //     this.applyInput()

    //     super()
    // }


}