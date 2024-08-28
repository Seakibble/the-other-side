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

        this.hud = new DungeonHud(this)
    }

    // MARK: purgeBullets
    purgeBullets() {
        // Remove bullets
        for (let i = this.dungeonObjects.length - 1; i >= 0; i--) {
            if (this.dungeonObjects[i].id == 'bullet') {
                this.dungeonObjects.splice(i,1)
            }
        }
    }

    // MARK: resetLevel
    resetLevel() {
        for (let i = this.dungeonObjects.length - 1; i >= 0; i--) {
            if (this.dungeonObjects[i].id == 'shooter') {
                this.dungeonObjects[i].reset()
            }
        }
    }

    // MARK: createObject
    make(config) {
        config.level = this
        config.ctx = this.ctx

        let obj
        switch(config.type) {
            case 'hazard': obj = new DungeonHazard(config); break
            case 'hero': obj = new DungeonHero(config); break
            case 'goal': obj = new DungeonGoal(config); break
            case 'respawn': obj = new DungeonRespawn(config); break
            case 'bullet': obj = new DungeonBullet(config); break
            case 'shooter': obj = new Shooter(config); break
            
            default: obj = new DungeonObject(config)
        }
        this.dungeonObjects.push(obj)
        return obj
    }
    
    doStuff() {
        // Remove objects slated for deletion
        for (let i = this.dungeonObjects.length - 1; i >= 0; i--) {
            if (this.dungeonObjects[i].destroy) {
                console.log("deleted " + this.dungeonObjects[i].id)
                this.dungeonObjects.splice(i, 1)
            }
        }

        this.hero.applyInput()

        this.dungeonObjects.forEach(obj => {
            obj.applyGravity(this.gravity)
            obj.update()
        })

        if (this.hero.pos.y > 500) {
            this.hero.damage(1, true)
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
                }
            }
        }

        
    }

    drawStuff() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        // update camera
        this.camera.update()
        
        // Draw dungeonObjects
        this.dungeonObjects.forEach(obj => {
            obj.draw(this.camera.getOffset())
        })

        // Draw HUD
        this.hud.drawHealth()
    }

    // MARK: startDungeonLoop
    startDungeonLoop() {
        let previousMs
        const step = 1 / FRAMERATE
        
        const stepFn = (timestampMs) => {

            if (previousMs === undefined) {
                previousMs = timestampMs
            }

            let delta = (timestampMs - previousMs) / 1000
            while (delta >= step) {
                // do the work
                if (!this.pause) {
                    this.doStuff(delta)
                    this.drawStuff()
                }
                
                delta -= step
            }
            previousMs = timestampMs - delta * 1000


            if (!this.over) {
                requestAnimationFrame(stepFn)
            }
        }
        this.drawStuff()
        requestAnimationFrame(stepFn)
    }

    // MARK: end
    end() {
        this.over = true
        this.parent.levelFinished()
    }
    
    // MARK: init
    init() {
        this.hero = this.make({
            type: 'hero',
            input: this.input,
            pos: [0,0]
        }) 



        this.make({
            pos: [-100,-100],
            size: [20,250],
        })
        this.make({
            pos: [-50,120],
            size: [60,30],
        })

        this.make({
            pos: [-100,150],
            size: [500,20],
        })

        this.make({
            pos: [400, 100],
            size: [50, 20],
        })

        this.make({ pos: [240, 144], size: [80, 6] })
        this.make({ pos: [250, 138], size: [70, 6] })
        this.make({ pos: [260, 132], size: [60, 6] })
        this.make({ pos: [270, 126], size: [100, 6] })

        this.make({
            pos: [450, 50],
            size: [50, 20],
        })

        this.make({
            pos: [-50, 70],
            size: [100, 10],
        })
        this.make({
            type: 'hazard',
            pos: [-40, 0],
            size: [20, 20],
        })

        this.make({
            type: 'goal',
            pos: [500, 0],
        })

        this.make({
            type: 'shooter',
            pos: [80, 50],
            hoverAmp: [2, 0.3],
            hoverFreq: [1/60, 5/60]
        })
        this.make({
            type: 'shooter',
            pos: [180, 50],
            variant: 'shotgun'
        })
        this.make({
            type: 'shooter',
            pos: [280, 50],
            variant: 'chain'
        })

        this.make({
            type: 'shooter',
            pos: [180, 0],
            variant: 'sniper'
        })
        // this.createObject({
        //     type: 'shooter',
        //     pos: new Vector(150, 0),
        //     shots: 7,
        //     attackCooldown: 5, 
        //     burstCooldown: 200,
        //     attackSpeed: 0.5
        // })
        // this.createObject({
        //     type: 'shooter',
        //     pos: new Vector(250, 20),
        //     attackSpeed: 2,
        //     attackCooldown: 5, 
        //     burstCooldown: 150
        // })

        this.camera = new DungeonCamera(this)
        this.startDungeonLoop()
    } 
    
}