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
        this.drag = 0.8

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

                // Collision detection
                for (let i = 0; i < this.dungeonObjects.length; i++) {
                    for (let j = i+1; j < this.dungeonObjects.length; j++) {
                        let collision = this.dungeonObjects[i].checkCollision(this.dungeonObjects[j])
                        if (collision) {
                            if (this.dungeonObjects[i].onCollide) {
                                this.dungeonObjects[i].onCollide(this.dungeonObjects[j])
                            }
                            if (this.dungeonObjects[j].onCollide) {
                                this.dungeonObjects[j].onCollide(this.dungeonObjects[i])
                            }
                            switch(collision) {
                                case 'bottom': 
                                    if (this.dungeonObjects[j].solid && this.dungeonObjects[i].solid) {
                                        this.dungeonObjects[i].land(this.dungeonObjects[j])
                                    }
                                    break
                                    
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
            pos: new Vector(10,10),
            size: new Vector(5,10),
            velocity: new Vector(0.1,-0.2)
        })

        this.dungeonObjects.push(this.hero)

        this.dungeonObjects.push(new DungeonObject({
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(0,150),
            size: new Vector(400,20),
        }))

        this.dungeonObjects.push(new DungeonGoal({
            dungeon: this,
            ctx: this.ctx,
            pos: new Vector(300,130),
        }))

        this.camera = new DungeonCamera(this)

        this.startDungeonLoop()

        this.dungeonContainer.classList.add('start')
        this.start = this.start.bind(this)
        this.dungeonContainer.addEventListener("animationend", this.start, { once: true })
    } 
    start () {
        this.pause = false
    }
}