class CharacterGeneration {
    constructor() {
    }


    // MARK: createElement
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add('charGen')
        this.element.innerHTML = (`
            <div id='charGen' class='charGen__form'>
                <label for='name'>What's your name, <b>Lieutentant</b>?</label>
                <input id='name' class='charGen__name' name='name' required placeholder='e.g. Darrens'>

                <label for='pronouns'>How do others refer to you?</label>
            </div>
        `)

        this.name = this.element.querySelector('.charGen__name')
        focus(this.name)
        // this.element.addEventListener('keypress', (e) => {
        //     console.log(e.key)
        //     if (e.key === 'Enter') {
        //         console.log(document.querySelector('button'))
        //         setTimeout(() => { focus(document.querySelector('button')) }, 10)
        //     }
        // })
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
                    label: "She",
                    description: "She/her",
                    handler: () => {
                        if (this.validate()) {
                            window.playerState.rank = "Lieutenant"
                            window.playerState.name = this.name.value
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
                            window.playerState.rank = "Lieutenant"
                            window.playerState.name = this.name.value
                            window.playerState.pronouns = 'he'
                            this.close()
                            new AudioManager().playSFX('start')
                            resolve()
                        }
                    }
                },
                {
                    label: "They",
                    description: "They/them",
                    handler: () => {
                        if (this.validate()) {
                            window.playerState.rank = "Lieutenant"
                            window.playerState.name = this.name.value
                            window.playerState.pronouns = 'they'
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
