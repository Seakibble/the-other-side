class DungeonRespawn extends DungeonObject {
    constructor(config) {
        super(config)
        this.id = 'respawn'
        
        this.color = 'gold'
        this.solid = false
        this.gravity = false

        this.velocity = new Vector(0, 0)

        this.rotate = 0
        this.rotateSpeed = 20

        this.target = config.target || new Vector(0,0)
        this.trueZero = new Vector(
            this.level.hero.size.x/2 - this.size.x/2,
            this.level.hero.size.y/2 - this.size.y/2
        )

        this.trueZero.add(this.target)

        this.magnetize = 0
        this.magnetizeRate = 0.004

    }
    
    update() {
        let truePos = this.pos.clone().subtract(this.trueZero)
        this.magnetize += this.magnetizeRate
        this.velocity.scale(0.5)
        if (this.magnetize > 1) this.magnetize = 1
        this.velocity.subtract(truePos.clone().scale(this.magnetize))

        super.update()
        
        if (this.trueZero.dist(this.pos) < 1) {
            this.level.hero.reset(this.target)
            this.destroy = true
        }
    }
}