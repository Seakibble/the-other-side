class DungeonObject {
    constructor(config) {
        this.level = config.level
        this.ctx = config.ctx
        
        this.pos = this.destructureIntoVector(config.pos) || new Vector(0,0)
        
        this.posStart = this.pos.clone()
        this.velocity = this.destructureIntoVector(config.velocity) || null
        this.size = this.destructureIntoVector(config.size) || new Vector(10,10)
        
        this.color = config.color || '#555'

        this.solid = config.solid || true

        this.voice = config.voice || null

        this.gravity = config.gravity || true

        this.hoverAmp = new Vector(0,0)
        this.hoverFreq = new Vector(0,0)
        this.hover = new Vector(0,0)
        this.age = 0

        this.rotate = null
        this.rotateSpeed = null

        this.grounded = false

        this.parent = config.parent || null
    }

    destructureIntoVector(coords) {
        if (Array.isArray(coords)) {
            return new Vector(coords[0],coords[1])
        } else if (coords && coords.x !== undefined && coords.y !== undefined) {
            return coords
        } else {
            return false
        }
    }

    update() {
        this.age++

        console.log(this.id)

        if (this.hoverAmp.x > 0) {
            this.hover.x = Math.sin(this.age * this.hoverFreq.x) * this.hoverAmp.x
        }
        if (this.hoverAmp.y > 0) {
            this.hover.y = Math.sin(this.age * this.hoverFreq.y) * this.hoverAmp.y
        }
        this.pos.add(this.hover)
        
        if (this.rotateSpeed !== null) {
            this.rotate += this.rotateSpeed
        }

        if (this.velocity === null) {
            return
        }
        

        this.velocity.clampX(-MAX_SPEED, MAX_SPEED)
        this.velocity.clampY(-MAX_SPEED, MAX_SPEED)

        this.pos.add(this.velocity)
        
    }

    applyGravity(gravity) {
        if (this.velocity === null || this.gravity === false) {
            return
        }

        if (this.grounded) {
            this.velocity.y = 0
        } else {
            this.velocity.add(gravity)
        }
    }

    

    land(other) {
        this.grounded = true

        if (this.velocity) {
            this.velocity.y = 0;
            this.pos.y = other.pos.y - this.size.y 
        }
    }

    checkCollision(other) {
        let parentX = null
        let parentY = null
        if (this.parent) {
            parentX = this.parent.pos.x
            parentY = this.parent.pos.y
        }

        let topLeft = new Vector(
            parentX + this.pos.x, 
            parentY + this.pos.y
        ).withinBounds(other)
        let topRight = new Vector(
            parentX + this.pos.x + this.size.x, 
            parentY + this.pos.y
        ).withinBounds(other)
        let bottomLeft = new Vector(
            parentX + this.pos.x, 
            parentY + this.pos.y + this.size.y
        ).withinBounds(other)
        let bottomRight = new Vector(
            parentX + this.pos.x + this.size.x, 
            parentY + this.pos.y + this.size.y
        ).withinBounds(other)

        if (topLeft && topRight && bottomLeft && bottomRight) return 'inside'
        else if (topLeft && topRight) return 'top'
        else if (topLeft && bottomLeft) return 'left'
        else if (topRight && bottomRight) return 'right'
        else if (bottomLeft && bottomRight) return 'bottom'
        else if (topLeft) return 'top'
        else if (topRight) return 'top'
        else if (bottomLeft) return 'bottom'
        else if (bottomRight) return 'bottom'
        else return false
    }

    draw(camera) {
        let x = Math.round(this.pos.x + camera.x)
        let y = Math.round(this.pos.y + camera.y)

        // let x = this.pos.x + camera.x
        // let y = this.pos.y + camera.y

        this.ctx.translate(x,y)

        if (this.parent) {
            this.ctx.translate(this.parent.pos.x, this.parent.pos.y)
        }

        if (this.rotateSpeed) {
            this.ctx.translate(this.size.x / 2, this.size.y / 2)
            this.ctx.rotate(this.rotate / 100)
            this.ctx.translate(-this.size.x / 2, -this.size.y / 2)
        }
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(0, 0, this.size.x, this.size.y)
        this.ctx.resetTransform()
        
    }
}