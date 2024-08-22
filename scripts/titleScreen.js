class TitleScreen {
    constructor({ progress }) {
        this.progress = progress
    }

    // MARK: getOptions
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

    // MARK: createElement
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add('TitleScreen')
        this.element.innerHTML = (`
            <img class="TitleScreen_logo" src="images/game-logo.png" alt="GAME">
            <div class='TitleScreen_controls'>
                <div class='TitleScreen_controls_row'>
                    <span> WASD / 
                        <i class="bi bi-arrow-up-square"></i>
                        <i class="bi bi-arrow-down-square"></i>
                        <i class="bi bi-arrow-left-square"></i>
                        <i class="bi bi-arrow-right-square"></i>
                    </span>
                    <span>Move</span>
                </div>
                <div>
                    <i class="bi bi-x-square"></i>
                    <span>Hold to skip cutscenes</span>
                </div>
                <div>
                    <span>SPACE or ENTER</span>
                    <span>Interact + Jump</span>
                </div>
            </div>
        `)
    }

    // MARK: close
    close() {
        this.keyboardMenu.end() 
        this.element.remove()
    }

    // MARK: init
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
