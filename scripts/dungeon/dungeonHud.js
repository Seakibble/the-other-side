class DungeonHud {
    constructor(level) {
        this.level = level
        this.ctx = this.level.ctx
        
        this.width = 5
        this.height = 10
        this.padding = 1
        this.spacing = 3
        this.offset = 10
    }

    drawHealth() {
        let hero = this.level.hero
        
        for (let i = 0; i < hero.hpMax; i++) {
            this.ctx.translate((this.width + this.spacing)*i + this.offset, this.offset)

            if (i < hero.hp) {
                this.ctx.fillStyle = '#a33'
                this.ctx.fillRect(0, 0, this.width, this.height)

                this.ctx.fillStyle = '#f55'
                this.ctx.fillRect(this.padding, this.padding, 
                    this.width-this.padding*2, this.height-this.padding*2)
            } else {
                this.ctx.fillStyle = '#733'
                this.ctx.fillRect(0, 0, this.width, this.height)

                this.ctx.fillStyle = '#200'
                this.ctx.fillRect(this.padding, this.padding, 
                    this.width-this.padding*2, this.height-this.padding*2)
            }
            this.ctx.resetTransform()

        }
    }
}