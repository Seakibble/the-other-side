class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector('.game-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.map = null
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

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig)
        this.map.overworld = this
        this.map.mountObjects()
    }

    init() {
        const audioManagerInstance = new AudioManager()

        audioManagerInstance.loadTracks(['tick'])
        
        this.startMap(window.OverworldMaps.Kitchen)

        this.bindActionInput()
        this.bindHeroPositionCheck()
        
        this.directionInput = new DirectionInput()
        this.directionInput.init()
        this.startGameLoop()

        this.map.startCutscene([
            { type: "changeMap", map: "DemoRoom" }
            // { type: "textMessage", text: "This is the very first message. I'm so excited! Hey, so are you new around here?" }
        ])
    }
}