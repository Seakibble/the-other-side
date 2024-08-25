class Shooter extends DungeonObject {
    constructor(config) {
        config.size = new Vector(10, 10)

        super(config)
        this.id = 'shooter'
        
        this.color = 'magenta'
        this.solid = false

        this.range = config.range || 250
        this.angle = config.angle || 40
        this.shots = config.shots || 1
        this.attackSpeed = config.attackSpeed || 1
        this.attackSize = config.attackSize || 4
        
        this.burstCooldown = config.burstCooldown || 0
        this.currentBurstCooldown = 0
        this.burstLength = config.burstLength || 10
        this.shotsFired = 0

        this.attackCooldown = config.attackCooldown || 60
        this.currentCooldown = 60
    }
    
    // MARK: onCollide
    onCollide(other){
        if (other.id === 'hero') {
            other.damage(1)
        }
    }

    // MARK: update
    update() {
        super.update()
        this.currentCooldown--
        this.currentBurstCooldown--

        if (this.level.hero.dead 
            || this.level.hero.pos.dist(this.pos) > this.range 
            || this.currentCooldown > 0
            || this.currentBurstCooldown > 0) { return }


        this.shotsFired++
        
        // Projects shots
        let offset = Math.floor(this.shots / 2) * -this.angle
        for (let i = 0; i < this.shots; i++) {
            this.fire(offset + i*this.angle)
        }
    }

    // MARK: fire
    fire(ang = 0) {
        this.currentCooldown = this.attackCooldown
        if (this.shotsFired == this.burstLength) {
            this.currentBurstCooldown = this.burstCooldown
            this.shotsFired = 0
        }
        
        let velocity = this.level.hero.pos.clone().subtract(this.pos).normalize().scale(this.attackSpeed)
        velocity.rotate(ang)

        let position = this.pos.clone()
            .add(this.size.clone().scale(0.5))
            .subtract(new Vector(this.attackSize/2, this.attackSize/2))
        
        // Push bullet out of shooter
        position.add(velocity.clone().scale(5))

        this.level.createObject({
            type: 'bullet',
            size: new Vector(this.attackSize, this.attackSize),
            pos: position,
            velocity: velocity
        })
    }

    reset() {
        this.shotsFired = 0
        this.currentBurstCooldown = 0
        this.currentCooldown = 0
    }
}