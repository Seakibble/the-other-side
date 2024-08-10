class OverworldMap {
    constructor(config) {
        this.overworld = null
        this.music = config.music || null
        this.gameObjects = {} // Live objects
        this.configObjects = config.configObjects // Configuration content

        this.cutsceneSpaces = config.cutsceneSpaces || {}

        this.walls = config.walls || {} 

        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc
        
        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc

        this.isCutscenePlaying = false
        this.letterboxed = false
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(SCREEN_CENTER_X) - cameraPerson.x,
            utils.withGrid(SCREEN_CENTER_Y) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(SCREEN_CENTER_X) - cameraPerson.x,
            utils.withGrid(SCREEN_CENTER_Y) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction)
        if (this.walls[`${x},${y}`]) {
            return true
        }
        // Check for game objects at this position
        return Object.values(this.gameObjects).find(obj => {
            if (obj.x === x && obj.y === y) { return true }
            if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y) { return true}
            return false
        })
    }

    mountObjects() {
        Object.keys(this.configObjects).forEach(key => {
            let object = this.configObjects[key]
            object.id = key

            let instance 
            if (object.type === 'Person') {
                instance = new Person(object)
            }
            this.gameObjects[key] = instance
            this.gameObjects[key].id = key
            instance.mount(this)
        })
    }

    playMusic() {
        new AudioManager().playMusic(this.music)
    }


    async startCutscene(events) {
        this.isCutscenePlaying = true

        // Start loop of async events, and await each one
        for (let i = 0; i < events.length; i++) {
            if (!this.letterboxed && events[i].type !== 'changeMap') {
                this.letterboxed = true
                this.overworld.startLetterboxing()

                const pauseEvent = new OverworldEvent({
                    event: {
                        type: 'wait',
                        duration: '500'
                    },
                    map: this
                })
                await pauseEvent.init()
            }

            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            await eventHandler.init()
        }
        
        this.overworld.setCameraPerson('hero')
        this.overworld.zoom(0)
        this.overworld.endLetterboxing()
        
        this.isCutscenePlaying = false
        this.letterboxed = false
    }


    checkForActionCutscene() {
        const hero = this.gameObjects["hero"]
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction)
        
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        })

        if (!this.isCutscenePlaying && match && match.talking.length) {
            const relevantScenario = match.talking.find(scenario => {
                return (scenario.required || []).every(sf => {
                    return window.playerState.storyFlags[sf]
                })
            })

            if (relevantScenario) {
                let scene = relevantScenario.events
                Object.values(scene).forEach(event => {
                    event.voice = match.voice
                })
                
                this.startCutscene(scene)
            }
        }
    }

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"]
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`]

        if (!this.isCutscenePlaying && match) {
            const relevantScenario = match.find(scenario => {
                return (scenario.required || []).every(sf => {
                    
                    return window.playerState.storyFlags[sf]
                })
            })
            if (relevantScenario) {
                this.startCutscene(relevantScenario.events)
            }
        }
    }

    
}

