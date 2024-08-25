class DungeonBullet extends DungeonObject {
    constructor(config) {
        super(config)
        this.id = 'bullet'
        
        this.color = 'white'
        this.solid = false
        this.gravity = false

        this.rotate = 0
        this.rotateSpeed = 20

        this.lifetime = 300
        this.life = 0

        this.damage = config.damage || 1
    }
    update() {
        super.update()
        this.life++

        if (this.life > this.lifetime) {
            this.destroy = true
        }
    }

    onCollide(other){
        if (other.id === 'hero') {
            // new AudioManager().playSFX('dungeon/goal')
            other.damage(this.damage)  
            this.destroy = true  
        } else if (other.solid) {
            this.destroy = true
        }
    }


}