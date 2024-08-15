class OverworldMap {
    constructor(config) {
        this.overworld = null
        this.music = config.music || null
        this.background = config.background || null

        this.gameObjects = {} // Live objects
        this.configObjects = config.configObjects // Configuration content

        this.cutsceneSpaces = config.cutsceneSpaces || {}
        this.initialCutscenes = config.initialCutscenes || []

        this.walls = config.walls || {}

        if (config.lowerSrc) {
            this.lowerImage = new Image()
            this.lowerImage.src = config.lowerSrc
        } else {
            this.lowerImage = null
        }

        if (config.upperSrc) {
            this.upperImage = new Image()
            this.upperImage.src = config.upperSrc
        } else {
            this.upperImage = null
        }

        this.isCutscenePlaying = false
        this.letterboxed = false
    }

    drawLowerImage(ctx, cameraPerson) {
        if (this.lowerImage === null) {
            return
        }
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(SCREEN_CENTER_X) - cameraPerson.x,
            utils.withGrid(SCREEN_CENTER_Y) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        if (this.upperImage === null) {
            return
        }

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
            if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y) { return true }
            return false
        })
    }

    mountObjects() {
        if (!this.configObjects) {
            return
        }

        Object.keys(this.configObjects).forEach(key => {
            let object = this.configObjects[key]

            let test = this.getRelevantScenario([object])
            if (test) {
                object.id = key

                let instance
                if (object.type === 'Person') { instance = new Person(object) }
                if (object.type === 'Flame') { instance = new Flame(object) }

                this.gameObjects[key] = instance
                this.gameObjects[key].id = key
                instance.mount(this)
            }
        })
    }

    playMusic() {
        new AudioManager().playMusic(this.music)
    }


    async startCutscene(events) {
        this.isCutscenePlaying = true

        // Start loop of async events, and await each one
        for (let i = 0; i < events.length; i++) {
            // if (!this.letterboxed && events[i].type !== 'changeMap') {
            //     this.letterboxed = true
            //     this.overworld.startLetterboxing()

            //     const pauseEvent = new OverworldEvent({
            //         event: {
            //             type: 'wait',
            //             duration: '500'
            //         },
            //         map: this
            //     })
            //     await pauseEvent.init()
            // }

            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            await eventHandler.init()
        }

        if (this.overworld.skipCutscenes) {
            this.overworld.toggleSkipCutscenes()
        }

        this.isCutscenePlaying = false
        this.letterboxed = false
    }


    checkForActionCutscene() {
        const hero = this.gameObjects["hero"]
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction)

        // Match is the gameObject being interacted with
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        })

        if (!this.isCutscenePlaying && match && match.talking.length) {
            const relevantScenario = this.getRelevantScenario(match.talking)

            if (relevantScenario) {
                let scene = relevantScenario.events
                Object.values(scene).forEach(event => {
                    if (!event.voice) {
                        event.voice = match.voice
                    }
                })
                this.startCutscene(scene)
            }
        }
    }

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"]

        // Match is the gameObject being interacted with
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`]

        if (!this.isCutscenePlaying && match) {
            const relevantScenario = this.getRelevantScenario(match)
            if (relevantScenario) {
                this.startCutscene(relevantScenario.events)
            }
        }
    }

    checkForInitialCutscene() {
        if (!this.initialCutscenes) {
            return
        }

        const relevantScenario = this.getRelevantScenario(this.initialCutscenes)
        if (relevantScenario) {
            this.startCutscene(relevantScenario.events)
        }
    }

    getRelevantScenario(list) {
        let scenarios = []

        list.forEach(scenario => {
            if (!scenario.excludes) {
                scenarios.push(scenario)
                return
            }

            let allow = true
            for (let i = 0; i < scenario.excludes.length; i++) {
                if (window.playerState.storyFlags[scenario.excludes[i]]) {
                    allow = false
                    break
                }
            }
            if (allow) {
                scenarios.push(scenario)
            }
        })

        const relevantScenario = scenarios.find(scenario => {
            return (scenario.requires || []).every(sf => {

                return window.playerState.storyFlags[sf]
            })
        })
        return relevantScenario
    }

}

