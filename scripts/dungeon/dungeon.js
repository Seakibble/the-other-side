class Dungeon {
    constructor(config) {
        this.overworld = config.overworld

        this.gameContainer = document.querySelector('.game-container')
        this.dungeonContainer = null
        this.canvas = null
        this.ctx = null
        this.pause = true

        this.resumeMusic = config.resumeMusic || false
        this.music = config.music

        this.gravity = new Vector(0, 0.2)

        window.input = new DungeonInput()
        this.input = window.input

        this.camera = null

        this.dungeonContainer = document.createElement('div')
        this.dungeonContainer.classList.add('dungeonContainer')
        this.canvas = document.createElement('canvas')
        this.canvas.width = "352"
        this.canvas.height = '198'
        this.ctx = this.canvas.getContext('2d')

        this.canvas.classList.add('dungeonCanvas')
        document.body.appendChild(this.dungeonContainer)
        this.dungeonContainer.appendChild(this.canvas)

        this.overworld.resizeFunctions.dungeon = this.resizeDungeonCanvas
        this.resizeDungeonCanvas()

        this.hero = null
        this.dungeonObjects = []
    }

    resizeDungeonCanvas() {
        let canvas = document.querySelector('.dungeonCanvas')
        let container = document.querySelector('.dungeonContainer')
        canvas.width = container.offsetWidth - (container.offsetWidth % 4)
        canvas.height = container.offsetHeight - (container.offsetHeight % 4)

        DUNGEON_SCREEN_CENTER_X = canvas.width * 0.5
        DUNGEON_SCREEN_CENTER_Y = canvas.height * 0.5
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

                if (this.hero.pos.y > 1000) {
                    this.hero.respawn() 
                }

                // Collision detection
                for (let i = 0; i < this.dungeonObjects.length; i++) {
                    for (let j = i + 1; j < this.dungeonObjects.length; j++) {
                        let a = this.dungeonObjects[i]
                        let b = this.dungeonObjects[j]
                        let colA = a.checkCollision(b)
                        let colB = b.checkCollision(a)
                        if (colA || colB) {
                            console.log(colA, colB)
                            if (a.onCollide) {
                                a.onCollide(b)
                            }
                            if (b.onCollide) {
                                b.onCollide(a)
                            }
                            if (b.solid && a.solid) {
                                switch(colA) {
                                    case 'bottom': 
                                        a.land(b)
                                        break
                                    case 'right': 
                                        if (a.velocity) { 
                                            a.velocity.x = 0
                                            a.pos.x = b.pos.x - a .size.x 
                                        }
                                        if (b.velocity) { 
                                            b.velocity.x = 0 
                                            b.pos.x = a.pos.x - b.size.x 
                                        }
                                        break 
                                    case 'left': 
                                        if (a.velocity) { 
                                            a.velocity.x = 0
                                            a.pos.x = b.pos.x + b.size.x 
                                        }
                                        if (b.velocity) { 
                                            b.velocity.x = 0 
                                            b.pos.x = a.pos.x + a.size.x 
                                        }
                                        break                                        
                                }
                                switch (colB) {
                                    case 'bottom':
                                        b.land(a)
                                        break
                                    case 'right':
                                        if (a.velocity) { 
                                            a.velocity.x = 0 
                                            a.pos.x = b.pos.x - a.size.x
                                        }
                                        if (b.velocity) { 
                                            b.velocity.x = 0
                                            b.pos.x = a.pos.x - b.size.x 
                                        }
                                    case 'left':
                                        if (a.velocity) { 
                                            a.velocity.x = 0 
                                            a.pos.x = b.pos.x + b.size.x
                                        }
                                        if (b.velocity) { 
                                            b.velocity.x = 0
                                            b.pos.x = a.pos.x + a.size.x 
                                        }
                                        break
                                }
                            }
                        }
                    }
                }
                

                this.camera.update()

                this.dungeonObjects.forEach(obj => {
                    obj.draw(this.camera.getOffset())
                })
            }
            requestAnimationFrame(() => {
                step()
            })
        }
        step()
    }

    done() {
        this.overworld.resizeFunctions.dungeon = null
        this.dungeonContainer.remove()
        this.input.unbind()

        setTimeout(() => {
            utils.emitEvent("DungeonComplete")
        }, 250)
    }
    endDungeon() {
        this.pause = true

        if (this.resumeMusic) {
            new AudioManager().playMusic(this.resumeMusic)
        } else {
            new AudioManager().stopMusic()
        }

        this.dungeonContainer.classList.remove('start')
        this.dungeonContainer.classList.add('end')
        this.done = this.done.bind(this)
        this.dungeonContainer.addEventListener("animationend", this.done, { once: true })
    }

    init() {
        if (this.music) {
            new AudioManager().playMusic(this.music)
        } else {
            new AudioManager().stopMusic()
        }

        this.hero = new DungeonHero({
            input: this.input,
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(0,0)
        })

        this.dungeonObjects.push(this.hero)

        this.dungeonObjects.push(new DungeonObject({
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(-50,120),
            size: new Vector(30,30),
        }))

        this.dungeonObjects.push(new DungeonObject({
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(-100,150),
            size: new Vector(500,20),
        }))

        this.dungeonObjects.push(new DungeonObject({
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(400, 110),
            size: new Vector(50, 20),
        }))

        this.dungeonObjects.push(new DungeonObject({
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(450, 70),
            size: new Vector(50, 20),
        }))

        this.dungeonObjects.push(new DungeonGoal({
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(470, 20),
        }))

        this.camera = new DungeonCamera(this)

        this.startDungeonLoop()

        this.dungeonContainer.classList.add('start')
        this.start = this.start.bind(this)
        this.dungeonContainer.addEventListener("animationend", this.start, { once: true })
    } 
    start () {
        this.pause = false
        new AudioManager().playSFX('dungeon/startDungeon')
    }
}