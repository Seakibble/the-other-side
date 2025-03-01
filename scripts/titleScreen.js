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
            <div class='TitleScreen_text'>
                <h1>
                    <i>T</i><i>H</i><i>E</i>
                    <i>O</i><i>T</i><i>H</i><i>E</i><i>R</i>
                    <i>S</i><i>I</i><i>D</i><i>E</i>
                </h1>
                <h2>An Interstellar Adventure</h2>
                <div class='separator'></div>
            </div>
            <!-- <img class="TitleScreen_logo" src="images/game-logo.png" alt="GAME"> -->
            <div class='TitleScreen_controls'>
                <div class='TitleScreen_controls_row'>
                    <span>Arrows / <b>[WASD]</b></span>
                    <span>Move</span>
                </div>
                <div>
                    <span>Hold <b>[X]</b></span>
                    <span>Skip cutscenes</span>
                </div>
                <div>
                    <span><b>[SPACE]</b> / <b>[ENTER]</b></span>
                    <span>Interact</span>
                </div>
                <div>
                    <span><b>[F11]</b></span>
                    <span>Fullscreen</span>
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
            new AudioManager().playMusic('ganymede-overture')   
        })
    }
}
