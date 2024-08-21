class TextMessage {
    constructor({ text, voice, who, speedMult, onComplete }) {
        this.text = text
        this.speedMult = speedMult || 1

        this.voice = null
        if (voice) {
            if (typeof voice === 'object') {
                this.voice = voice
            } else {
                this.voice = voices[voice]
            }
        } else if (who && who.voice) {
            this.voice = who.voice
        } else {
            this.voice = {
                name: null,
                color: null,
                font: null,
                sfx: null
            }
        }

        this.onComplete = onComplete
        this.element = null
        this.finished = false
    }

    // MARK: createElement
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("textMessage")

        let color = this.voice.color ? `style="color:${this.voice.color}"` : ""

        let name = ``
        if (this.voice.name !== null) {
            name = `<span class="textMessage_name revealed ${this.voice.font}">${this.voice.name}</span>`
        }
        this.element.innerHTML = (`
            
            <p class="textMessage_text" ${color}>
                ${name}
                <span class="textMessage_content ${this.voice.font}"></span>
                <button class="textMessage_button ${this.voice.font}">Press Space${ utils.ellipsis() }
                </button>
            </p>
            
        `)

        // Init the typewriter effect
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".textMessage_content"),
            voice: this.voice,
            text: this.text,
            speedMult: this.speedMult
        })

        this.element.addEventListener("click", () => {
            // Close text message
            this.done()
        })

        this.actionListener = new KeyPressListener("Space", () => {
            this.done()
        })
    }

    // MARK: done
    done(skip = false) {
        if (skip) {
            this.revealingText.warpToDone()
        }

        if (this.revealingText.isDone) {
            this.element.remove()
            this.actionListener.unbind()
            this.onComplete()
            this.finished = true
        } else {
            this.revealingText.warpToDone()
        }
    }

    // MARK: init
    init(container) {
        this.createElement()
        container.appendChild(this.element)
        this.revealingText.init(() => {
            this.element.querySelector('.textMessage_button').classList.add('revealed')
        })
    }
}