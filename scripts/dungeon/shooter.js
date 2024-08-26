class Shooter extends DungeonObject {
    constructor(config) {
        config.size = new Vector(10, 10)
        config.velocity = null
        config.gravity = false
        super(config)
        this.id = 'shooter'
        
        this.color = config.color || 'grey'
        this.subColor = config.subColor || 'red'
        this.borderWidth = 1

        this.solid = false

        this.hoverAmp = this.destructureIntoVector(config.hoverAmp) || new Vector(Math.random()*3,Math.random()*1)
        this.hoverFreq = this.destructureIntoVector(config.hoverFreq) || new Vector(Math.random()*0.02, Math.random()*0.07)

        this.range = config.range || 100
        this.angle = config.angle || 40
        this.shots = config.shots || 1
        this.attackSpeed = config.attackSpeed || 1.5
        this.attackSize = config.attackSize || 4

        this.attackSFX = config.attackSFX || 'shot-1'
        
        this.burstCooldown = config.burstCooldown || 80
        this.currentBurstCooldown = 0
        this.burstLength = config.burstLength || 3
        this.shotsFired = 0

        this.attackCooldown = config.attackCooldown || 20
        this.currentCooldown = 0

        switch(config.variant) {
            case 'shotgun': 
                this.shots = 8
                this.angle = 5
                this.attackSFX = 'shot-shotgun'
                this.subColor = 'green'
                break
            case 'chain': 
                this.range = 150
                this.burstLength = 10
                this.attackCooldown = 10
                this.attackSpeed = 3
                this.attackSFX = 'shot-2'
                this.subColor = 'lightblue'
                break
            case 'sniper': 
                this.range = 250
                this.burstLength = 1
                this.burstCooldown = 150
                this.attackSpeed = 5
                this.attackSFX = 'shot-sniper'
                this.subColor = 'magenta'
                break
        }
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
        new AudioManager().playSFX('dungeon/'+this.attackSFX)
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

        this.level.make({
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
        this.age = 0
        this.pos = this.posStart.clone()
    }

    draw(camera) {
        super.draw(camera)
        let x = Math.round(this.pos.x + camera.x + this.borderWidth)
        let y = Math.round(this.pos.y + camera.y + this.borderWidth)

        this.ctx.translate(x, y)

        this.ctx.fillStyle = this.subColor
        this.ctx.fillRect(0, 0, this.size.x - this.borderWidth * 2, this.size.y - this.borderWidth * 2)
        this.ctx.resetTransform()

    }
}