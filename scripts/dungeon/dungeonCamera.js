class DungeonCamera {
    constructor(dungeon) {
        this.dungeon = dungeon
        this.target = dungeon.hero
        this.pos = this.target.pos.clone()

        this.lerpFactor = 0.1
    }

    setLerpFactor(factor) {
        this.lerpFactor = factor 
    }

    setTarget(target) {
        this.target = target
    }

    getOffset() {
        let offset = new Vector(
            -this.pos.x + DUNGEON_SCREEN_CENTER_X - this.target.size.x / 2,
            -this.pos.y + DUNGEON_SCREEN_CENTER_Y - this.target.size.y / 2
        )

        return offset
    }

    update() {
        if (this.target === null) {
            return
        }

        this.pos.x += (this.target.pos.x - this.pos.x) * this.lerpFactor
        this.pos.y += (this.target.pos.y - this.pos.y) * this.lerpFactor
    }
}