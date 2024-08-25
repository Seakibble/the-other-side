class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(vec) {
        this.x += vec.x
        this.y += vec.y

        return this
    }
    subtract(vec) {
        this.x -= vec.x
        this.y -= vec.y

        return this
    }
    mult(vec) {
        this.x *= vec.x
        this.y *= vec.y

        return this
    }
    dist(target) {
        return target.clone().subtract(this).magnitude()
    }
    scale(scalar) {
        this.x *= scalar
        this.y *= scalar

        return this
    }

    clone() {
        return new Vector(this.x, this.y)
    }

    magnitude() {
        let mag = this.x * this.x + this.y * this.y
        mag = Math.sqrt(mag)

        return mag
    }

    normalize() {
        let mag = this.magnitude()

        this.x /= mag
        this.y /= mag

        return this
    }

    rotate(ang) {
        ang = -(ang * Math.PI/180)
        
        let newVec = new Vector()

        newVec.x = this.x * Math.cos(ang) - this.y * Math.sin(ang)
        newVec.y = this.x * Math.sin(ang) + this.y * Math.cos(ang)

        this.x = newVec.x
        this.y = newVec.y
        return this
    }

    clampX(lower = null, upper = null) {
        if (upper && this.x > upper) {
            this.x = upper
        }
        if (lower && this.x < lower) {
            this.x = lower
        }

        return this
    }
    clampY(lower = null, upper = null) {
        if (upper && this.y > upper) {
            this.y = upper
        }
        if (lower && this.y < lower) {
            this.y = lower
        }
        return this
    }

    static left() { return new Vector(-1, 0) }
    static right() { return new Vector(1, 0) }
    static up() { return new Vector(0, -1) }
    static down() { return new Vector(0, 1) }

    withinBounds(obj) {
        return (this.x >= obj.pos.x && this.x <= obj.pos.x + obj.size.x
            && this.y >= obj.pos.y && this.y <= obj.pos.y + obj.size.y)
    }
}