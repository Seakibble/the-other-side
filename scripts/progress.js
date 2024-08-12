class Progress {
    constructor(overworld) {
        this.mapId = "DeathLand"
        this.startingHeroX = 0
        this.startingHeroY = 0
        this.startingHeroDirection = "down"
        this.saveFileKey = "PizzaLegends_SaveFile1"
        this.overworld = overworld
        this.saveIcon = null
    }
    
    save() {
        window.localStorage.setItem(this.saveFileKey, JSON.stringify({
            mapId: this.mapId,
            startingHeroX: this.startingHeroX,
            startingHeroY: this.startingHeroY,
            startingHeroDirection: this.startingHeroDirection,
            playerState: {
                storyFlags: window.playerState.storyFlags
            }
        }))
        
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

    getSaveFile() {
        const file = window.localStorage.getItem(this.saveFileKey)
        return file ? JSON.parse(file) : null
    }
    
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