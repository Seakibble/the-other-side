class CharacterGeneration {
    constructor() {
    }


    // MARK: createElement
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add('charGen')
        this.element.innerHTML = (`
            <form id='charGen' class='charGen__form'>
                <label for='name'>Name the Lost Soul:</label>
                <input id='name' class='charGen__name' name='name' required placeholder='e.g. Lucy'>

                <label for='pronouns'>Name the Lost Soul:</label>
                <select id='pronouns' class='charGen__pronouns' name='pronouns' required>
                    <option value='they' selected>They</option>
                    <option value='she'>She</option>
                    <option value='he'>He</option>
                </select>
            </form>
        `)

        this.name = this.element.querySelector('.charGen__name')
        this.pronouns = this.element.querySelector('.charGen__pronouns')
    }

    // MARK: close
    close() {
        this.keyboardMenu.end() 
        this.element.remove()
    }

    // MARK: validate
    validate() {
        return (this.name.value && this.pronouns.value)
    }

    // MARK: init
    init(container) {
        this.validate = this.validate.bind(this)
        return new Promise(resolve => {
            this.createElement()
            
            container.appendChild(this.element) 
            this.keyboardMenu = new KeyboardMenu(container)
            this.keyboardMenu.init(this.element)
            this.keyboardMenu.setOptions([
                {
                    label: "Begin Adventure",
                    description: "Start the game",
                    handler: () => {
                        if (this.validate()) {
                            window.playerState.name = this.name.value
                            window.playerState.pronouns = this.pronouns.value
                            this.close()
                            new AudioManager().playSFX('start')
                            resolve()
                        }
                    }
                    // Maybe have a continue option
                },
            ])
            // new AudioManager().playMusic('crossing-to-the-other-side')
        })
    }
}
