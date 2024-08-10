class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector('.game-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.map = null
        this.music = null
        this.cameraPerson = null
        this.camera = {
            x: 0,
            y: 0
        }
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
            if (this.cameraPerson === null) {
                this.cameraPerson = this.map.gameObjects.hero
                this.camera = {
                    x: this.cameraPerson.x,
                    y: this.cameraPerson.y
                }
            }

            // Lerp Camera
            if (Math.round(this.camera.x) != Math.round(this.cameraPerson.x)
                || Math.round(this.camera.y) != Math.round(this.cameraPerson.y)) {
                let distX = (this.cameraPerson.x - this.camera.x) / 20
                let distY = (this.cameraPerson.y - this.camera.y) / 20
                distX = Math.ceil(distX)
                distY = Math.ceil(distY)
                this.camera.x += distX
                this.camera.y += distY
            }

            const cameraRounded = {
                x: Math.round(this.camera.x) - GAME_GRID_SIZE / 2,
                y: Math.round(this.camera.y) + GAME_GRID_SIZE / 2
            }

            // Update Game Objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })
            
            // Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraRounded)

            // Draw Game Objects
            Object.values(this.map.gameObjects).sort((a, b) => {
                // Sort objects by their y values.
                return a.y - b.y
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraRounded)
            })

            // Draw Upper Layer
            this.map.drawUpperImage(this.ctx, cameraRounded)

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

    startLetterboxing() {
        this.element.classList.add('cutscene')
    }
    endLetterboxing() {
        this.element.classList.remove('cutscene')
    }

    zoomIn() {
        this.canvas.classList.add('zoom')
    }
    zoomOut() {
        this.canvas.classList.remove('zoom')
    }

    setCameraPerson(target) {
        if (this.map.gameObjects[target]) {
            this.cameraPerson = this.map.gameObjects[target]
        }
    }

    async init() {
        window.onresize = this.resizeCanvas
        this.resizeCanvas()
        const audioManagerInstance = new AudioManager()

        // create a new progress tracker
        this.progress = new Progress(this)

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