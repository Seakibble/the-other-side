class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text
        this.onComplete = onComplete
        this.element = null
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("textMessage")

        this.element.innerHTML = (`
            <p class="textMessage_p"></p>
            <button class="textMessage_button">Next</button>
        `)

        // Init the typewriter effect
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".textMessage_p"),
            text: this.text
        })

        this.element.querySelector('button').addEventListener("click", () => {
            // Close text message
            this.done()
        })

        this.actionListener = new KeyPressListener("Enter", () => {
            this.done()
        })
    }

    done() {
        if (this.revealingText.isDone) {
            this.element.remove()
            this.actionListener.unbind()
            this.onComplete()
        } else {
            this.revealingText.warpToDone()
        }
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)
        this.revealingText.init()
    }
}