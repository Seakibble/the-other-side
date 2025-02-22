class Progress {
    constructor(overworld) {
        this.mapId = "Bridge"
        this.startingHeroX = 6
        this.startingHeroY = 3
        this.startingHeroDirection = "down"
        this.saveFileKey = "PizzaLegends_SaveFile1"
        this.overworld = overworld
        this.saveIcon = null
    }
    
    // MARK: save
    save() {
        window.localStorage.setItem(this.saveFileKey, JSON.stringify({
            mapId: this.mapId,
            startingHeroX: this.startingHeroX,
            startingHeroY: this.startingHeroY,
            startingHeroDirection: this.startingHeroDirection,
            playerState: {
                name: window.playerState.name,
                pronouns: window.playerState.pronouns,
                storyFlags: window.playerState.storyFlags
            }
        }))

        if (this.saveIcon) {
            this.saveIcon.removeEventListener('animationend', () => {
                if (this.saveIcon) {
                    this.saveIcon.remove()
                    this.saveIcon = null
                }
            })
            this.saveIcon.remove()
            this.saveIcon = null
        }
        
        if (!this.saveIcon) {
            this.saveIcon = document.createElement('div')
            this.saveIcon.classList.add('save-icon')
            this.saveIcon.innerHTML = `Saving${utils.ellipsis() }`
        }

        this.overworld.element.appendChild(this.saveIcon)
        this.saveIcon.addEventListener('animationend', () => {
            if (this.saveIcon) {
                this.saveIcon.remove()
                this.saveIcon = null
            }
        }, { once: true })
    }

    // MARK: getSaveFile
    getSaveFile() {
        const file = window.localStorage.getItem(this.saveFileKey)
        return file ? JSON.parse(file) : null
    }
    
    // MARK: load
    load() {
        const file = this.getSaveFile()
        if (file) {
            this.mapId = file.mapId
            this.startingHeroX = file.startingHeroX
            this.startingHeroY = file.startingHeroY
            this.startingHeroDirection = file.startingHeroDirection
            Object.keys(file.playerState).forEach(key => {
                playerState[key] = file.playerState[key]
            })
        }
    }
}