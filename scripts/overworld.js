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

            // Establish the camera person if they're not defined
            if (this.cameraPerson === null) {
                this.cameraPerson = this.map.gameObjects.hero
                this.camera = {
                    x: this.cameraPerson.x,
                    y: this.cameraPerson.y
                }
            }

            let averageCamera = {
                x: 0,
                y: 0
            }
            if (Array.isArray(this.cameraPerson)) {
                this.cameraPerson.forEach(obj => {
                    averageCamera.x += obj.x
                    averageCamera.y += obj.y
                })
                averageCamera.x /= this.cameraPerson.length
                averageCamera.y /= this.cameraPerson.length
            } else {
                averageCamera = this.cameraPerson
            }

            // Lerp Camera
            if (Math.round(this.camera.x) != Math.round(averageCamera.x)
                || Math.round(this.camera.y) != Math.round(averageCamera.y)) {
                let distX = (averageCamera.x - this.camera.x) / 20
                let distY = (averageCamera.y - this.camera.y) / 20

                if (distX > 0) {
                    distX = Math.ceil(distX)
                } else {
                    distX = Math.floor(distX)
                }
                if (distY > 0) {
                    distY = Math.ceil(distY)
                } else {
                    distY = Math.floor(distY)
                }
                
                this.camera.x += distX
                this.camera.y += distY
            }

            const cameraRounded = {
                x: Math.round(this.camera.x) + GAME_GRID_SIZE / 2,
                y: Math.round(this.camera.y) - GAME_GRID_SIZE / 2
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

            // Debug Camera Position
            // this.ctx.fillStyle = "orange";
            // this.ctx.fillRect(this.cameraPerson.x - cameraRounded.x + SCREEN_CENTER_X * GAME_GRID_SIZE, this.cameraPerson.y - cameraRounded.y + SCREEN_CENTER_Y * GAME_GRID_SIZE, 1,1);

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

    zoom(factor = 1) {
        this.canvas.classList.remove('zoom1');
        this.canvas.classList.remove('zoom2');
        this.canvas.classList.remove('zoom3');
        this.canvas.classList.remove('zoom4');

        switch (factor) {
            case 1: this.canvas.classList.add('zoom1'); break
            case 2: this.canvas.classList.add('zoom2'); break
            case 3: this.canvas.classList.add('zoom3'); break
            case 4: this.canvas.classList.add('zoom4'); break
        }
        
    }

    setCameraPerson(target) {
        if (Array.isArray(target)) {
            let targets = []
            target.forEach(obj => {
                if (this.map.gameObjects[obj]) {
                    targets.push(this.map.gameObjects[obj])
                }
            })
            this.cameraPerson = targets
        } else if (this.map.gameObjects[target]) {
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
            { type: "zoom", level: 1 },
        ])
    }
}