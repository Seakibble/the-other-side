class DungeonObject {
    constructor(config) {
        this.dungeon = config.dungeon
        this.ctx = config.ctx
        this.pos = config.pos || new Vector(10,10)
        this.velocity = config.velocity || null
        this.size = config.size || new Vector(10,10)
        this.color = config.color || 'white'

        this.solid = config.solid || true

        this.grounded = false
    }

    update() {
        if (this.velocity === null) {
            return
        }

        this.velocity.clampX(-MAX_SPEED, MAX_SPEED)
        this.velocity.clampY(-MAX_SPEED, MAX_SPEED)

        this.pos.add(this.velocity)
    }

    applyGravity(gravity) {
        if (this.velocity !== null) {
            if (this.grounded) {
                this.velocity.y = 0
                this.velocity.x *= this.dungeon.drag
            } else {
                this.velocity.add(gravity)
            }
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
        let topLeft = this.pos.withinBounds(other)
        let topRight = new Vector(this.pos.x + this.size.x, this.pos.y).withinBounds(other)
        let bottomLeft = new Vector(this.pos.x, this.pos.y + this.size.y).withinBounds(other)
        let bottomRight = new Vector(this.pos.x + this.size.x, this.pos.y + this.size.y).withinBounds(other)

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

        this.ctx.fillStyle = this.color
        this.ctx.fillRect(x, y, this.size.x, this.size.y)
    }
}