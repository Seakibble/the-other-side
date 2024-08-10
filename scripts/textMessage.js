class TextMessage {
    constructor({ text, voice, who, onComplete }) {
        this.text = text
        this.voice = null
        
        if (who && who.voice) {
            this.voice = who.voice
        } else if (voice) {
            this.voice = voice
        } else {
            this.voice = {
                name: '???',
                color: null,
                font: null,
                sfx: null
            }
        }
        this.onComplete = onComplete
        this.element = null
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("textMessage")

        let color = this.voice.color ? `style="color:${this.voice.color}"` : ""

        this.element.innerHTML = (`
            
            <p class="textMessage_text ${this.voice.font}" ${color}>
                <span class="textMessage_name revealed">${this.voice.name}</span>
                <span class="textMessage_content"></span>
                <button class="textMessage_button">Press Enter<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
                </button>
            </p>
            
        `)

        // Init the typewriter effect
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".textMessage_content"),
            voice: this.voice,
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
        this.revealingText.init(() => {
            this.element.querySelector('.textMessage_button').classList.add('revealed')
        })
    }
}