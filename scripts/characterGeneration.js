class CharacterGeneration {
    constructor() {
    }


    // MARK: createElement
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add('charGen')
        this.element.innerHTML = (`
            <form id='charGen' class='charGen__form'>
                <label for='name'>What is your name, Lieutentant?</label>
                <input id='name' class='charGen__name' name='name' required placeholder='e.g. Darrens' focus>

                <label for='pronouns'>How would you like people to refer to you?</label>
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
        let valid = this.name.value

        if (!valid) {
            this.name.classList.add('required')
        }
        return valid
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
                    label: "They",
                    description: "They/them",
                    handler: () => {
                        if (this.validate()) {
                            window.playerState.name = "Lt. " + this.name.value
                            window.playerState.pronouns = 'they'
                            this.close()
                            new AudioManager().playSFX('start')
                            resolve()
                        }
                    }
                },
                {
                    label: "She",
                    description: "She/her",
                    handler: () => {
                        if (this.validate()) {
                            window.playerState.name = "Lt. " + this.name.value
                            window.playerState.pronouns = 'she'
                            this.close()
                            new AudioManager().playSFX('start')
                            resolve()
                        }
                    }
                },
                {
                    label: "He",
                    description: "He/him",
                    handler: () => {
                        if (this.validate()) {
                            window.playerState.name = "Lt. " + this.name.value
                            window.playerState.pronouns = 'he'
                            this.close()
                            new AudioManager().playSFX('start')
                            resolve()
                        }
                    }
                },
            ])
            setTimeout(()=> {this.name.focus()}, 10)
            // new AudioManager().playMusic('crossing-to-the-other-side')
        })
    }
}
