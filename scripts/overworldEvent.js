class OverworldEvent {
    constructor({ map, event }) {
        this.map = map
        this.event = event
    }

    // MARK: stand
    stand(resolve) {

        const who = this.map.gameObjects[this.event.who]

        who.startBehaviour({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        // Set up a handler to complete when correct person is done walking,
        // then resolve the event.
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete", completeHandler)
                resolve()
            }
        }


        document.addEventListener("PersonStandComplete", completeHandler)
    }

    // MARK: backstep
    backstep(resolve, skip) {
        const who = this.map.gameObjects[this.event.who]

        who.startBehaviour({
            map: this.map
        }, {
            type: "backstep",
            direction: this.event.direction,
            retry: true,
            skip: skip
        })

        // Set up a handler to complete when correct person is done backstepping,
        // then resolve the event.
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler)
                resolve()
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    // MARK: walk
    walk(resolve, skip) {
        const who = this.map.gameObjects[this.event.who]

        who.startBehaviour({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true,
            skip: skip
        })

        // Set up a handler to complete when correct person is done walking,
        // then resolve the event.
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler)
                resolve()
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    // MARK: jump
    jump(resolve, skip) {
        const who = this.map.gameObjects[this.event.who]

        who.jump(this.event.force || OVERWORLD_JUMP_FORCE)
        new AudioManager().playSFX('dungeon/jump')

        // Set up a handler to complete when correct person is done walking,
        // then resolve the event.
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("JumpComplete", completeHandler)
                resolve()
            }
        }

        document.addEventListener("JumpComplete", completeHandler)
    }

    // MARK: focus
    focus(resolve) {
        this.map.overworld.camera.setTarget(this.event.who)
        resolve()
    }

    // MARK: textMessage
    textMessage(resolve) {
        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero]
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction)
        }

        this.map.overworld.activeMessage = new TextMessage({
            text: this.event.text,
            voice: this.event.voice,
            speedMult: this.event.speedMult,
            who: this.map.gameObjects[this.event.who],
            onComplete: () => resolve()
        })

        this.map.overworld.activeMessage.init( document.querySelector('.game-container'))
    }

    // MARK: changeMap
    changeMap(resolve) {
        // Deactivate old objects
        Object.values(this.map.gameObjects).forEach(obj => {
            obj.isMounted = false
        })
        console.log(this.event)

        const sceneTransition = new SceneTransition()
        sceneTransition.init(document.querySelector('.game-container'), () => {
            this.map.overworld.camera.setTarget(null)
            this.map.overworld.startMap(window.OverworldMaps[this.event.map], {
                x: this.event.x,
                y: this.event.y,
                direction: this.event.direction || 'down'
            }, this.event.noMusic || false)
            resolve()

            // console.log(this.map.gameObjects['hero'][0])
            // if (this.map.gameObjects['hero']) {
            //     this.map.overworld.setCameraPerson('hero')
            // }
            sceneTransition.fadeOut()
        })
    }
    
    // MARK: wait
    wait(resolve) {
        const completeHandler = e => {
            document.removeEventListener("WaitComplete", completeHandler)
            resolve()
        }
        document.addEventListener("WaitComplete", completeHandler)
        
        setTimeout(() => {
            utils.emitEvent("WaitComplete")
        }, this.event.duration)
    }

    // MARK: wait
    increaseHealth(resolve) {
        window.playerState.hp += this.event.amount
        
        this.event.text = `Your health has increased by ${this.event.amount} to a total of ${window.playerState.hp}`
        
        this.textMessage(resolve)
    }

    // MARK: addStoryFlag
    addStoryFlag(resolve) {
        window.playerState.storyFlags[this.event.flag] = true
        resolve()
    }

    // MARK: removeStoryFlag
    removeStoryFlag(resolve) {
        window.playerState.storyFlags[this.event.flag] = false
        resolve()
    }

    // MARK: zoom
    zoom(resolve) {
        this.map.overworld.zoom(this.event.level)
        resolve()
    }

    // MARK: letterbox
    letterbox(resolve) {
        if (this.event.enable) {
            this.map.overworld.startLetterboxing()
        } else {
            this.map.overworld.endLetterboxing()
        }
        resolve()
    }

    // MARK: setCameraPerson
    setCameraPerson(resolve) {
        this.map.overworld.setCameraPerson(this.event.who)
        resolve()
    }

    // MARK: playMusic 
    playMusic(resolve) {
        
        if (this.event.track == null) {
            new AudioManager().stopMusic()
        } else {
            new AudioManager().playMusic(this.event.track)
        }
        resolve()
    }

    // MARK: saveProgress
    saveProgress(resolve) {
        this.map.overworld.progress.save()
        resolve()
    }

    // MARK: delete
    delete(resolve) {
        this.map.gameObjects[this.event.who].sprite.hide()

        const completeHandler = e => {
            document.removeEventListener("ObjectFadeComplete", completeHandler)
            delete this.map.gameObjects[this.event.who]
            resolve()
        }
        document.addEventListener("ObjectFadeComplete", completeHandler)
        
    }

    // MARK: dungeon
    async dungeon(resolve) {
        new AudioManager().playSFX('dungeon/enterDungeon')
        this.map.overworld.inDungeon = true
        if (this.map.overworld.skipCutscenes) {
            this.map.overworld.toggleSkipCutscenes()
        }

        let dungeon = new Dungeon({
            overworld: this.map.overworld,
            music: this.event.music,
            resumeMusic: this.event.resumeMusic || new AudioManager().nowPlaying || null,
            levels: this.event.levels
        })

        const completeHandler = e => {
            document.removeEventListener("DungeonComplete", completeHandler)
            this.map.overworld.inDungeon = false
            resolve()
        }
        document.addEventListener("DungeonComplete", completeHandler)

        dungeon.init()
    }

    // MARK: roomTitle
    roomTitle(resolve) {
        let title = new RoomTitle({
            text: this.event.text
        })
        title.init(document.querySelector('.game-container'))
        
        resolve()
    }

    // MARK: init
    init() {
        if (this.map.overworld.skipCutscenes) {
            if (['textMessage', 'wait'].includes(this.event.type)) {
                return new Promise(resolve => {
                    resolve()
                })
            }
        }
        return new Promise(resolve => {
            this[this.event.type](resolve, this.map.overworld.skipCutscenes)
        })
    }
}