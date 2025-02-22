class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector('.game-canvas')
        this.ctx = this.canvas.getContext('2d')

        this.skipping = this.element.querySelector('.blackout_skip')
        this.skipping.innerHTML = `<p>Skipping the boring bits${utils.ellipsis()}</p>`

        this.blind = this.element.querySelector('.blackout_blind')
        
        this.activeMessage = null

        this.inDungeon = false

        this.map = null
        this.music = null
        
        this.skipCutscenes = false
        this.skipHoldThreshold = 1000
        this.skipStart = null
        this.skipHeld = false

        this.resizeFunctions = {
            overworld: this.resizeOverworldCanvas,
            dungeon: null
        }

        this.camera = new OverworldCamera()
    }

    // MARK: resizeCanvas
    resizeCanvas() {
        overworld.resizeFunctions.overworld()
        if (overworld.resizeFunctions.dungeon) {
            overworld.resizeFunctions.dungeon()
        }
    }
    
    // MARK: resizeOverworldCanvas
    resizeOverworldCanvas() {
        let canvas = document.querySelector('.game-canvas')
        let container = document.querySelector('.game-container')
        canvas.width = container.offsetWidth - (container.offsetWidth % 4)
        canvas.height = container.offsetHeight - (container.offsetHeight % 4)

        SCREEN_CENTER_X = canvas.width / GAME_GRID_SIZE * 0.5
        SCREEN_CENTER_Y = canvas.height / GAME_GRID_SIZE * 0.5 -1
    }

    gameLoopStepWork(delta) {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Update Game Objects
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.directionInput.direction,
                map: this.map,
            })
        })

        this.camera.update()

        // Draw Lower Layer
        this.map.drawLowerImage(this.ctx, this.camera.getPos())

        // Draw Game Objects
        Object.values(this.map.gameObjects).sort((a, b) => {
            // Sort objects by their y values and renderlevel.
            console.log(a.id, a.y / GAME_GRID_SIZE, b.id, b.y / GAME_GRID_SIZE, (a.y / GAME_GRID_SIZE * 10 + a.renderLevel) - (b.y / GAME_GRID_SIZE * 10 + b.renderLevel))
            return (a.y * 10 + a.renderLevel) - (b.y * 10 + b.renderLevel)
        }).forEach(object => {
            object.sprite.draw(this.ctx, this.camera.getPos())
        })

        // Draw Upper Layer
        this.map.drawUpperImage(this.ctx, this.camera.getPos()
        )

        // Debug Camera Position
        // this.ctx.fillStyle = "orange";
        // this.ctx.fillRect(this.cameraPerson.x - cameraRounded.x + SCREEN_CENTER_X * GAME_GRID_SIZE, this.cameraPerson.y - cameraRounded.y + SCREEN_CENTER_Y * GAME_GRID_SIZE, 1,1);

        // Check skip 
        if (this.skipHeld && this.map.isCutscenePlaying && !this.inDungeon) {
            this.skipping.classList.add('showing')
            if (Date.now() - this.skipStart > this.skipHoldThreshold) {
                this.toggleSkipCutscenes()
                this.skipHeld = false
            }
        } else {
            this.skipping.classList.remove('showing')
            this.skipHold = 0
        }
    }

    // MARK: startGameLoop
    startGameLoop() {

        let previousMs
        const step = 1 / FRAMERATE
        
        const stepFn = (timestampMs) => {
            if (previousMs === undefined) {
                previousMs = timestampMs
            }
            let delta = (timestampMs - previousMs) / 1000
            while (delta >= step) {
                // do the work
                this.gameLoopStepWork(delta)
                delta -= step
            }
            previousMs = timestampMs - delta * 1000

            // Business as usual tick            
            requestAnimationFrame(stepFn)
        }
        requestAnimationFrame(stepFn)
    }

    // MARK: toggleSkipCutscenes
    toggleSkipCutscenes() {
        this.skipCutscenes = !this.skipCutscenes

        if (this.skipCutscenes) {
            this.skipping.classList.add('show')
            if (this.activeMessage !== null) {
                if (this.activeMessage.finished) {
                    this.activeMessage = null
                } else {
                    this.activeMessage.done(true)
                }
            }
        } else {
            this.skipping.classList.remove('show')
        }
    }

    // MARK: bindActionInput
    bindActionInput() {
        new KeyPressListener(["Space", "Enter"], () => {
            // Is there a person here to talk to?

            this.map.checkForActionCutscene()
        })

        new KeyPressListener("KeyX", () => {
            this.skipHeld = true
            this.skipStart = Date.now()
        }, () => {
            this.skipHeld = false
        })
    }

    // MARK: bindHeroPositionCheck
    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "hero") {
                // Hero's position has changed
                this.map.checkForFootstepCutscene()
            }
        })
    }

    // MARK: startMap
    startMap(mapConfig, heroInitialState = null) {
        this.map = new OverworldMap(mapConfig)
        this.map.overworld = this
        if (this.map.background) {
            this.canvas.style = "background: " + this.map.background
        } else {
            this.canvas.style = ""
        }
        this.map.mountObjects()
        this.map.playMusic()

        if (heroInitialState && heroInitialState.x !== undefined && this.map.gameObjects.hero) {
            this.map.gameObjects.hero.x = heroInitialState.x
            this.map.gameObjects.hero.y = heroInitialState.y
            this.map.gameObjects.hero.direction = heroInitialState.direction
        }

        this.progress.mapId = mapConfig.id
        if (this.map.gameObjects.hero) {
            this.progress.startingHeroX = this.map.gameObjects.hero.x
            this.progress.startingHeroY = this.map.gameObjects.hero.y
            this.progress.startingHeroDirection = this.map.gameObjects.hero.direction
        }

        this.camera.setMap(this.map)

        // Save Progress
        this.progress.save()

        this.map.checkForInitialCutscene()
    }

    // MARK: letterboxing
    startLetterboxing() {
        this.element.classList.add('cutscene')
    }

    endLetterboxing() {
        this.element.classList.remove('cutscene')
    }

    // MARK: lowerBlind
    lowerBlind(instant = false) {
        if (instant) {
            let blind = document.createElement('div')
            blind.classList.add('blackout_blind', 'show')
            this.element.prepend(blind)
            this.blind = blind
        } else {
            this.blind.classList.remove('show')
        }
    }

    // MARK: riseBlind
    raiseBlind(instant = false) {
        setTimeout(() => {
            if (instant) {
                this.blind.remove()

                let blind = document.createElement('div')
                blind.classList.add('blackout_blind')
                this.element.prepend(blind)
                this.blind = blind
            } else {
                this.blind.classList.remove('show')
            }
        }, 10)
        
    }

    // MARK: zoom
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

    // MARK: init
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
        } else {
            let charGen = new CharacterGeneration()
            await charGen.init(document.querySelector('.game-container'))
        }

        window.voices.hero.name = window.playerState.name

        // Start map
        this.lowerBlind(true)
        this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState)
        this.raiseBlind()

        // Create controls
        this.bindActionInput()
        this.bindHeroPositionCheck()
        
        this.directionInput = new DirectionInput()
        this.directionInput.init()
        this.startGameLoop()
    }
}