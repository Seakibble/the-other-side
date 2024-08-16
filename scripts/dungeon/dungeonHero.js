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


        this.plateMargin = 3

        this.downTouch = false
        this.down = new DungeonObject({
            dungeon: this.dungeon,
            ctx: this.ctx,
            pos: new Vector(this.plateMargin*2,this.size.y-1),
            size: new Vector(this.size.x-this.plateMargin*4, 1),
            color: 'red', 
            parent: this
        })
        this.up = new DungeonObject({
            dungeon: this.dungeon,
            ctx: this.ctx,
            pos: new Vector(this.plateMargin*2,0),
            size: new Vector(this.size.x-this.plateMargin*4, 1),
            color: 'red', 
            parent: this
        })
        this.left = new DungeonObject({
            dungeon: this.dungeon,
            ctx: this.ctx,
            pos: new Vector(0,this.plateMargin*3),
            size: new Vector(1, this.size.y-this.plateMargin*6),
            color: 'red', 
            parent: this
        })
        this.right = new DungeonObject({
            dungeon: this.dungeon,
            ctx: this.ctx,
            pos: new Vector(this.size.x-1,this.plateMargin*3),
            size: new Vector(1, this.size.y-this.plateMargin*6),
            color: 'red', 
            parent: this
        })

        this.jumping = false
        this.color = 'dodgerblue'
    }

    applyInput() {
        // Jump
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

        // Walking
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
        let hit = null
        if (other.solid) {
            let downCollision = this.down.checkCollision(other)
            let upCollision = this.up.checkCollision(other)
            let leftCollision = this.left.checkCollision(other)
            let rightCollision = this.right.checkCollision(other)

            if (downCollision && other.solid) {
                this.downTouch = other
            }

            if (leftCollision) { hit = 'left' }
            else if (rightCollision) { hit = 'right' }
            else if (downCollision) { hit = 'bottom' }
            else if (upCollision) { hit = 'top' }

            switch (hit) {
                case 'bottom':
                    this.land(other)
                    break
                case 'top': 
                    this.velocity.y = 0
                    this.pos.y = other.pos.y + other.size.y
                    break
                case 'left': 
                    this.velocity.x = 0
                    this.pos.x = other.pos.x+other.size.x
                    break
                case 'right':
                    this.velocity.x = 0
                    this.pos.x = other.pos.x - this.size.x
                    break
            }
        } else {
            hit = super.checkCollision(other)
        }
        
        return hit
    }
    update(){
        super.update()
        
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

    draw(camera) {
        super.draw(camera)
        // this.down.draw(camera)
        // this.up.draw(camera)
        // this.left.draw(camera)
        // this.right.draw(camera)

    }

    // update() {

    //     this.applyInput()

    //     super()
    // }


}