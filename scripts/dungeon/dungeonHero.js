class DungeonHero extends DungeonObject {
    constructor(config) {
        super(config)
        this.id = 'hero'
        this.input = config.input

        this.jump = -5
        this.speed = 3
        this.drag = 0.4

        this.size.x = 12
        this.size.y = 22

        this.velocity = new Vector(0,0)

        this.brakeX = false
        this.brakeY = false

        this.hpMax = 10
        this.hp = this.hpMax
        this.dead = false

        this.safePos = [new Vector(0,0)]


        this.plateThickness = 2
        this.plateMargin = 3

        this.downTouch = false
        this.down = new DungeonObject({
            dungeon: this.dungeon,
            ctx: this.ctx,
            pos: new Vector(this.plateMargin*2,this.size.y-this.plateThickness),
            size: new Vector(this.size.x-this.plateMargin*4, this.plateThickness),
            color: 'red', 
            parent: this
        })
        this.up = new DungeonObject({
            dungeon: this.dungeon,
            ctx: this.ctx,
            pos: new Vector(this.plateMargin*2,0),
            size: new Vector(this.size.x-this.plateMargin*4, this.plateThickness),
            color: 'red', 
            parent: this
        })
        this.left = new DungeonObject({
            dungeon: this.dungeon,
            ctx: this.ctx,
            pos: new Vector(0,this.plateMargin*3),
            size: new Vector(this.plateThickness, this.size.y-this.plateMargin*6),
            color: 'red', 
            parent: this
        })
        this.right = new DungeonObject({
            dungeon: this.dungeon,
            ctx: this.ctx,
            pos: new Vector(this.size.x-this.plateThickness,this.plateMargin*3),
            size: new Vector(this.plateThickness, this.size.y-this.plateMargin*6),
            color: 'red', 
            parent: this
        })

        this.jumping = false
        this.color = 'dodgerblue'
    }

    updateSafePos() {
        this.safePos.unshift(this.pos.clone())
        if(this.safePos.length > 60) {
            this.safePos.pop()
        }
    }
    resetSafePos() {
        this.safePos = [this.pos.clone()]
    }

    // MARK: damage
    damage(dam, reset = false) {
        if (this.hp > 0 && !this.dead) {
            new AudioManager().playSFX('dungeon/damage')
        }
        this.hp -= dam
        if (this.hp <= 0) {
            this.respawn()
        } else if (reset) {
            this.respawn(true)
        }
    }

    // MARK: applyInput
    applyInput() {
        // Jump
        if (this.input.up && this.grounded && !this.input.jumpLock) {
            this.grounded = false
            this.input.jumpLock = true
            this.jumping = true
            this.downTouch = null
            this.velocity.y += this.jump
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

    // MARK: applyDrag
    applyDrag() {
        this.velocity.x *= this.drag
    }
    
    // MARK: land
    land(other) {
        if (!this.grounded) {
            new AudioManager().playSFX('dungeon/land')
            this.resetSafePos()
        }

        super.land(other)
        this.jumping = false
    }


    // MARK: checkCollision
    checkCollision(other) {
        if (this.dead) { return }

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


            // if (hit) {
            //     this.unfuck(hit, other)
            // }

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

    // // Disaster - forget it exists
    //
    // unfuck(direction, other) {

    //     let offset = 0
    //     switch(direction) {
    //         case 'left': 
    //             offset = this.pos.x - other.pos.x - this.size.x
    //             this.brakeX = true
    //             break
    //         case 'right': 
    //             offset = this.pos.x - other.pos.x + other.size.x
    //             this.brakeX = true
    //             break
    //         case 'top': 
    //             offset = this.pos.y - other.pos.y - this.size.y
    //             this.brakeY = true
    //             break
    //         case 'bottom': 
    //             offset = this.pos.y - other.pos.y + other.size.y
    //             this.brakeY = true
    //             break
    //     }

    //     let mag = this.velocity.magnitude()
    //     let minimumDistance = mag - offset
    //     let offsetVelocity = this.velocity.clone()
    //     offsetVelocity.scale(1 / minimumDistance)

    //     // console.log(direction, minimumDistance, offsetVelocity)
    //     // if (direction == 'right') alert(direction, minimumDistance, offsetVelocity)
    //     this.pos.subtract(offsetVelocity)
    //     console.log(direction, this.pos)
    // }

    // MARK: update
    update() {
        if (this.dead) { return }

        if (this.brakeX) {
            this.velocity.x = 0
        }
        if (this.brakeY) {
            this.velocity.y = 0
        }
        
        this.brakeX = false
        this.brakeY = false

        super.update()
        
        if (!this.downTouch) {
            this.downTouch = null
            this.grounded = false
        } else {
            this.land(this.downTouch)
        }
        this.downTouch = false

        if (this.grounded) {
            this.updateSafePos()
        }
    }

    // MARK: reset
    reset(resetPos) {
        this.dead = false

        if (this.hp <= 0) {
            this.hp = this.hpMax
            this.pos = resetPos || new Vector(0, 0)
            this.velocity = new Vector(0, 0)
            this.grounded = false
            this.downTouch = false
            this.safePos = [new Vector(0, 0)]
            
            this.level.purgeBullets()
            this.level.resetLevel()
        } else {
            this.pos = resetPos || new Vector(0, 0)
        }

        this.level.camera.setTarget(this)
    }

    // MARK: respawn
    respawn(reposition = false) {
        new AudioManager().playSFX('dungeon/respawn')

        let target = new Vector(0,0) 
        if (reposition) {
            target = this.safePos[this.safePos.length - 1]
            let respawner = this.level.make({
                type: 'respawn',
                pos: this.pos.clone(),
                target: target
            })

            this.pos.y = -100000
            this.dead = true

            this.level.camera.setTarget(respawner)
        } else {
            this.reset()
        }

        
    }

    // MARK: draw
    draw(camera) {
        if (this.dead) { return }
        super.draw(camera)

        // let x = Math.round(this.safePos[this.safePos.length-1].x + camera.x)
        // let y = Math.round(this.safePos[this.safePos.length-1].y + camera.y)

        // this.ctx.translate(x,y)
        // this.ctx.fillStyle = '#0f0'
        // this.ctx.fillRect(0, 0, 2, 2)
        // this.ctx.resetTransform()

        // Draw Pressure plates
        // this.down.draw(camera)
        // this.up.draw(camera)
        // this.left.draw(camera)
        // this.right.draw(camera)
    }
}