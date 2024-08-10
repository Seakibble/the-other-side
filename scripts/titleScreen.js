class TitleScreen {
    constructor({ progress }) {
        this.progress = progress
    }

    getOptions(resolve) {
        const saveFile = this.progress.getSaveFile()
        return [
            {
                label: "New Game",
                description: "Start a new game",
                handler: () => {
                    this.close()
                    new AudioManager().playSFX('start')
                    resolve()
                }
                // Maybe have a continue option
            },
            saveFile ? {
                label: "Continue Game",
                description: "Resume your adventure",
                handler: () => {
                    this.close()
                    new AudioManager().playSFX('start')
                    resolve(saveFile)
                }
            } : null
        ].filter(v => v) // filter falsy options
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add('TitleScreen')
        this.element.innerHTML = (`
            <img class="TitleScreen_logo" src="/images/game-logo.png" alt="GAME">
        `)
    }

    close() {
        this.keyboardMenu.end() 
        this.element.remove()
    }

    init(container) {
        return new Promise(resolve => {
            this.createElement()
            container.appendChild(this.element) 
            this.keyboardMenu = new KeyboardMenu(container)
            this.keyboardMenu.init(this.element)
            this.keyboardMenu.setOptions(this.getOptions(resolve))
            // new AudioManager().playMusic('crossing-to-the-other-side')
        })
    }
}