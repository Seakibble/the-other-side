class DungeonGoal extends DungeonObject {
    constructor(config) {
        super(config)
        this.id = 'goal'
        
        this.color = 'gold'
        this.solid = false
    }
    
    onCollide(other){
        if (other.id === 'hero') {
            this.dungeon.endDungeon()
        }
    }
}