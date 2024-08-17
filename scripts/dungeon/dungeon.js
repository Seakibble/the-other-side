class Dungeon {
    constructor(config) {
        this.overworld = config.overworld

        this.resumeMusic = config.resumeMusic || false
        this.music = config.music
        
        this.gameContainer = document.querySelector('.game-container')
        this.dungeonContainer = null
        this.canvas = null
        this.ctx = null

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

        window.input = new DungeonInput()
        this.input = window.input

        this.level = new DungeonLevel(this)
        this.levels = config.levels || 1

        config.parent = this
    }

    resizeDungeonCanvas() {
        let canvas = document.querySelector('.dungeonCanvas')
        let container = document.querySelector('.dungeonContainer')
        canvas.width = container.offsetWidth - (container.offsetWidth % 4)
        canvas.height = container.offsetHeight - (container.offsetHeight % 4)

        DUNGEON_SCREEN_CENTER_X = canvas.width * 0.5
        DUNGEON_SCREEN_CENTER_Y = canvas.height * 0.5
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

    levelFinished() {
        this.levels -= 1
        if (this.levels === 0) {
            this.endDungeon()
        } else {
            this.restart()
        }
    }

    init() {
        if (this.music) {
            new AudioManager().playMusic(this.music)
        } else {
            new AudioManager().stopMusic()
        }

        this.dungeonContainer.classList.add('start')
        this.start = this.start.bind(this)
        this.dungeonContainer.addEventListener("animationend", this.start, { once: true })
        this.level.init()
    }

    restart() {
        this.level = new DungeonLevel(this)
        this.level.init()
        this.start()
    }

    start () {
        this.level.pause = false
        new AudioManager().playSFX('dungeon/startDungeon')
    }
}