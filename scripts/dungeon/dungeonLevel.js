class DungeonLevel {
    constructor(parent) {
        this.parent = parent

        this.dungeonContainer = this.parent.dungeonContainer
        this.canvas = this.parent.canvas
        this.ctx = this.parent.ctx
        this.pause = true
    

        this.gravity = new Vector(0, 0.2)

        this.input = window.input

        this.camera = null

        this.over = false

        this.hero = null
        this.dungeonObjects = []
    }

    

    startDungeonLoop() {
        const step = () => {
            if (!this.pause) {
                // Clear the canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

                this.hero.applyInput()
                
                this.dungeonObjects.forEach(obj => {
                    obj.applyGravity(this.gravity)
                    obj.update()
                })

                if (this.hero.pos.y > 500) {
                    this.hero.respawn() 
                }

                // Collision detection
                for (let i = 0; i < this.dungeonObjects.length; i++) {
                    for (let j = i + 1; j < this.dungeonObjects.length; j++) {
                        let a = this.dungeonObjects[i]
                        let b = this.dungeonObjects[j]
                        let colA = a.checkCollision(b)
                        let colB = b.checkCollision(a)

                        // if (a.id == 'hero' || b.id == 'hero') {
                        //     console.log(colA, colB)
                        // }

                        if (colA || colB) {    
                            if (a.onCollide) {
                                a.onCollide(b)
                            }
                            if (b.onCollide) {
                                b.onCollide(a)
                            }
                            if (b.solid && a.solid) {
                                // switch(colA) {
                                //     case 'bottom': 
                                //         a.land(b)
                                //         break
                                //     case 'right': 
                                //         if (a.velocity) { 
                                //             a.velocity.x = 0
                                //             a.pos.x = b.pos.x - a .size.x 
                                //         }
                                //         if (b.velocity) { 
                                //             b.velocity.x = 0 
                                //             b.pos.x = a.pos.x - b.size.x 
                                //         }
                                //         break 
                                //     case 'left': 
                                //         if (a.velocity) { 
                                //             a.velocity.x = 0
                                //             a.pos.x = b.pos.x + b.size.x 
                                //         }
                                //         if (b.velocity) { 
                                //             b.velocity.x = 0 
                                //             b.pos.x = a.pos.x + a.size.x 
                                //         }
                                //         break                                        
                                // }
                                // switch (colB) {
                                //     case 'bottom':
                                //         b.land(a)
                                //         break
                                //     case 'right':
                                //         if (a.velocity) { 
                                //             a.velocity.x = 0 
                                //             a.pos.x = b.pos.x - a.size.x
                                //         }
                                //         if (b.velocity) { 
                                //             b.velocity.x = 0
                                //             b.pos.x = a.pos.x - b.size.x 
                                //         }
                                //     case 'left':
                                //         if (a.velocity) { 
                                //             a.velocity.x = 0 
                                //             a.pos.x = b.pos.x + b.size.x
                                //         }
                                //         if (b.velocity) { 
                                //             b.velocity.x = 0
                                //             b.pos.x = a.pos.x + a.size.x 
                                //         }
                                //         break
                                // }
                            }
                        }
                    }
                }
                

                this.camera.update()
            }
            this.dungeonObjects.forEach(obj => {
                obj.draw(this.camera.getOffset())
            })

            if (!this.over) {
                requestAnimationFrame(() => {
                    step()
                })
            }
        }
        step()
    }

    end() {
        this.over = true
        this.parent.levelFinished()
    }
    

    init() {
        this.hero = new DungeonHero({
            input: this.input,
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(0,0)
        })

        this.dungeonObjects.push(this.hero)

        this.dungeonObjects.push(new DungeonObject({
            level: this,
            ctx: this.ctx,
            pos: new Vector(-100,-100),
            size: new Vector(20,250),
        }))
        this.dungeonObjects.push(new DungeonObject({
            level: this,
            ctx: this.ctx,
            pos: new Vector(-50,120),
            size: new Vector(30,30),
        }))

        this.dungeonObjects.push(new DungeonObject({
            level: this,
            ctx: this.ctx,
            pos: new Vector(-100,150),
            size: new Vector(500,20),
        }))

        this.dungeonObjects.push(new DungeonObject({
            level: this,
            ctx: this.ctx,
            pos: new Vector(400, 100),
            size: new Vector(50, 20),
        }))

        this.dungeonObjects.push(new DungeonHazard({
            level: this,
            ctx: this.ctx,
            pos: new Vector(240, 140),
            size: new Vector(80, 10),
        }))

        this.dungeonObjects.push(new DungeonObject({
            level: this,
            ctx: this.ctx,
            pos: new Vector(450, 50),
            size: new Vector(50, 20),
        }))

        this.dungeonObjects.push(new DungeonObject({
            level: this,
            ctx: this.ctx,
            pos: new Vector(150, 70),
            size: new Vector(50, 20),
        }))

        this.dungeonObjects.push(new DungeonGoal({
            level: this,
            ctx: this.ctx,
            pos: new Vector(470, -20),
        }))

        this.camera = new DungeonCamera(this)

        this.startDungeonLoop()

    } 
    
}