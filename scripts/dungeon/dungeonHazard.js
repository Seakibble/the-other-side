class DungeonHazard extends DungeonObject {
    constructor(config) {
        super(config)
        this.id = 'hazard'
        
        this.color = 'red'
        this.solid = false
    }
    
    onCollide(other){
        if (other.id === 'hero') {
            other.respawn()            
        }
    }
}