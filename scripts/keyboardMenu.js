class KeyboardMenu {
    constructor() {
        this.options = []
        this.up = null
        this.down = null
        this.prevFocus = null
    }

    // MARK: setOptions
    setOptions(options) {
        this.options = options
        this.element.innerHTML = this.options.map((option, index) => {
            const disabledAttr = option.disabled ? "disabled" : ''
            return (`
                <div class="option">
                    <button ${disabledAttr}  data-button="${index}" data-description="${option.description}">
                        ${option.label}
                    </button>
                    <span>${option.right ? option.right() : ''}</span>
                </div>
                `)
        }).join("")

        this.element.querySelectorAll("button").forEach(button => {
            button.addEventListener('click', () => {
                // console.log(chosenOption)
                const chosenOption = this.options[Number(button.dataset.button)]

                chosenOption.handler()
            })
            button.addEventListener('mouseenter', () => {
                button.focus()
            })
            button.addEventListener('focus', () => {
                this.prevFocus = button
                this.descriptionElementText.innerText = button.dataset.description 
            })
        })

        setTimeout(() => {
            this.element.querySelector('button[data-button]:not([disabled])').focus()
        }, 10)
    }

    // MARK: createElement
    createElement() {
        this.element = document.createElement('div')
        this.element.classList.add("KeyboardMenu")

        this.descriptionElement = document.createElement("div")
        this.descriptionElement.classList.add('DescriptionBox')
        this.descriptionElement.innerHTML = (`<p></p>`)
        this.descriptionElementText = this.descriptionElement.querySelector('p')
    }

    // MARK: end
    end() {
        this.element.remove()
        this.descriptionElement.remove()

        this.up.unbind()
        this.down.unbind()
    }

    // MARK: init
    init(container,l) {
        this.createElement()
        container.appendChild(this.descriptionElement)
        container.appendChild(this.element)

        this.up = new KeyPressListener(["ArrowUp", "KeyW"], (keyCode) => {
            // Cancel keypress if an input field is focused
            console.log(document.activeElement.tagName, keyCode)
            if (document.activeElement.tagName == "INPUT" && keyCode == "KeyW") {
                return
            }

            const current = Number(this.prevFocus.getAttribute('data-button'))
            const prevButton = Array.from(this.element.querySelectorAll('button[data-button]')).reverse().find(el => {
                return el.dataset.button < current && !el.disabled
            })
            prevButton?.focus()
            new AudioManager().playSFX('menuMove')
        })
        this.down = new KeyPressListener(["ArrowDown", "KeyS"], (keyCode) => {
            // Cancel keypress if an input field is focused
            if (document.activeElement.tagName == "INPUT" && keyCode == "KeyS") {
                return
            }
            const current = Number(this.prevFocus.getAttribute('data-button'))
            const nextButton = Array.from(this.element.querySelectorAll('button[data-button]')).find(el => {
                return el.dataset.button > current && !el.disabled
            })
            nextButton?.focus()
            new AudioManager().playSFX('menuMove')
        })
    }
}