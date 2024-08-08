class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector('.game-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.map = null
        this.music = null
    }

    resizeCanvas() {
        let canvas = document.querySelector('.game-canvas')
        let container = document.querySelector('.game-container')
        canvas.width = container.offsetWidth - (container.offsetWidth % 4)
        canvas.height = container.offsetHeight - (container.offsetHeight % 4)

        SCREEN_CENTER_X = canvas.width / GAME_GRID_SIZE * 0.5
        SCREEN_CENTER_Y = canvas.height / GAME_GRID_SIZE * 0.5 -1
    }

    startGameLoop() {
        const step = () => {
            // Clear the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            // Establish the camera person
            const cameraPerson = this.map.gameObjects.hero

            // Update Game Objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })
            
            // Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraPerson)

            // Draw Game Objects
            Object.values(this.map.gameObjects).sort((a, b) => {
                // Sort objects by their y values.
                return a.y - b.y
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson)
            })

            // Draw Upper Layer
            this.map.drawUpperImage(this.ctx, cameraPerson)

            requestAnimationFrame(() => {
                step()
            })
        }
        step()
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // Is there a person here to talk to?

            this.map.checkForActionCutscene()
        })
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "hero") {
                // Hero's position has changed
                this.map.checkForFootstepCutscene()
            }
        })
    }

    startMap(mapConfig, heroInitialState = null) {
        this.map = new OverworldMap(mapConfig)
        this.map.overworld = this
        this.map.mountObjects()
        this.map.playMusic()

        if (heroInitialState && heroInitialState.x !== undefined) {
            console.log(heroInitialState)
            this.map.gameObjects.hero.x = heroInitialState.x
            this.map.gameObjects.hero.y = heroInitialState.y
            this.map.gameObjects.hero.direction = heroInitialState.direction
        }

        this.progress.mapId = mapConfig.id
        this.progress.startingHeroX = this.map.gameObjects.hero.x
        this.progress.startingHeroY = this.map.gameObjects.hero.y
        this.progress.startingHeroDirection = this.map.gameObjects.hero.direction

        // Save Progress
        this.progress.save()
    }

    async init() {
        window.onresize = this.resizeCanvas
        this.resizeCanvas()
        const audioManagerInstance = new AudioManager()

        // audioManagerInstance.loadSFX(['tick', 'walk'])

        // create a new progress tracker
        this.progress = new Progress()

        // Show title screen
        this.titleScreen = new TitleScreen({
            progress: this.progress
        })
        const useSaveFile = await this.titleScreen.init(document.querySelector('.game-container'))

        // Potentially load data
        let initialHeroState = null
    
        if (useSaveFile) {
            this.progress.load()
            initialHeroState = {
                x: this.progress.startingHeroX,
                y: this.progress.startingHeroY,
                direction: this.progress.startingHeroDirection,
            }
        }

        // Start map
        this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState)

        // Create controls
        this.bindActionInput()
        this.bindHeroPositionCheck()
        
        this.directionInput = new DirectionInput()
        this.directionInput.init()
        this.startGameLoop()

        this.map.startCutscene([
            // { type: "changeMap", map: "DemoRoom" }
            // { type: "textMessage", text: "This is the very first message. I'm so excited! Hey, so are you new around here?" }
        ])
    }
}