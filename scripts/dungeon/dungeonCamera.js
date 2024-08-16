class DungeonCamera {
    constructor(dungeon) {
        this.dungeon = dungeon
        this.target = dungeon.hero
        this.x = this.target.pos.x
        this.y = this.target.pos.y
    }

    getOffset() {
        let offset = new Vector(
            -this.x + DUNGEON_SCREEN_CENTER_X - this.target.size.x / 2,
            -this.y + DUNGEON_SCREEN_CENTER_Y - this.target.size.y / 2
        )

        return offset
    }

    update() {
        this.x += (this.target.pos.x - this.x) * 0.1
        this.y += (this.target.pos.y - this.y) * 0.1
    }
}