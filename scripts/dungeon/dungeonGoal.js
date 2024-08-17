class DungeonGoal extends DungeonObject {
    constructor(config) {
        super(config)
        this.id = 'goal'
        
        this.color = 'white'
        this.solid = false

        this.rotate = 0
        this.rotateSpeed = 8
    }
    
    onCollide(other){
        if (other.id === 'hero') {
            new AudioManager().playSFX('dungeon/goal')
            this.level.end()  
        }
    }
}