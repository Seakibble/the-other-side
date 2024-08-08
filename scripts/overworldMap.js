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
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            await eventHandler.init()
        }
        
        this.isCutscenePlaying = false
    }


    checkForActionCutscene() {
        const hero = this.gameObjects["hero"]
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction)
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        })
        if (!this.isCutscenePlaying && match && match.talking.length) {
            let scene = match.talking[0].events
            Object.values(scene).forEach(event => event.voice = match.voice)
            this.startCutscene(scene)
        }
    }

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"]
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`]
        if (!this.isCutscenePlaying && match) {
            this.startCutscene( match[0].events)
        }
    }

    
}

window.OverworldMaps = {
    DemoRoom: {
        music: "track-01",
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        configObjects: {
            hero: {
                type: 'Person',
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                isPlayerControlled: true
            },
            npcA: {
                type: 'Person',
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                voice: 'highVoice',
                src: "images/characters/people/npc1.png",
                behaviourLoop: [
                    { type: "stand", direction: "left", time: 800 },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "stand", direction: "right", time: 1200 },
                    { type: "stand", direction: "up", time: 300 },
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Ugh... you're so annoying!", faceHero: "npcA" },
                            { type: "textMessage", text: "I'm busy, go away!" },
                            { who: "hero", type: "walk", direction: "left" },
                        ]
                    }
                ]
            },
            npcB: {
                type: 'Person',
                x: utils.withGrid(8),
                y: utils.withGrid(5),
                voice: 'deepVoice',
                src: "images/characters/people/npc2.png",
                behaviourLoop: [
                    { type: "stand", direction: "down", time: 5000 },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "up" },
                    { type: "stand", direction: "up", time: 5000 },
                    { type: "walk", direction: "left" },
                    { type: "walk", direction: "down" },
                    { type: "walk", direction: "left" },
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "What? You need something?", faceHero: "npcB" },
                            { type: "textMessage", text: "No? Then get lost buddy. I'm very busy thinking hard about what my next words will be. Or something to that effect, I suppose." },
                        ] 
                    }
                ]
                // behaviourLoop: [
                //     { type: "walk", direction: "left" },
                //     { type: "stand", direction: "up", time: 800 },
                //     { type: "walk", direction: "up" },
                //     { type: "walk", direction: "right" },
                //     { type: "walk", direction: "down" },
                // ]
            }
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(1, 3)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7, 4)]: [
                {
                    events: [
                        { who: "npcB", type: "walk", direction: "left" },
                        { who: "npcB", type: "stand", direction: "up"},
                        { who: "hero", type: "stand", direction: "down", time: 200 },
                        {type: "textMessage", text: "You can't be in there!"},
                        { who: "npcB", type: "walk", direction: "right" },
                        { who: "npcB", type: "stand", direction: "down" },
                        
                        { who: "hero", type: "walk", direction: "down" },
                        { who: "hero", type: "walk", direction: "left" },
                        { who: "hero", type: "walk", direction: "left" }
                    ]
                }
            ],
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        { type: "changeMap", map: "Kitchen" },
                    ]
                }
            ],
        }
    },
    Kitchen: {
        music: "track-02",
        lowerSrc: "images/maps/KitchenLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                x: utils.withGrid(5),
                y: utils.withGrid(5),
                isPlayerControlled: true
            },
            npcB: {
                type: "Person",
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "images/characters/people/npc3.png", 
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "You made it!", faceHero: "npcB" },
                            { type: "textMessage", text: "Hmmmm... I wonder what to make for lunch?"},
                        ]
                    }
                ]
            }
        },
        cutsceneSpaces: {
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        { type: "changeMap", map: "DemoRoom" },
                    ]
                }
            ],
        }
    }
}