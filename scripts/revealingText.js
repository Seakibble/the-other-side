class RevealingText {
    constructor(config) {
        this.element = config.element
        this.text = config.text
        this.speed = config.speed || 150

        this.periodSpeed = 5
        this.commaSpeed = 3

        this.timeout = null
        this.isDone = false
    }

    revealOneWord(list) {
        const next = list.splice(0, 1)[0]
        next.span.classList.add("revealed")
        console.log( new AudioManager())
        new AudioManager().tick.play()

        if (list.length > 0) {
            this.timeout = setTimeout(() => {
                this.revealOneWord(list)
            }, next.delayAfter) 
        } else {
            this.isDone = true
        }
    }

    warpToDone() {
        clearTimeout(this.timeout)
        this.isDone = true

        this.element.querySelectorAll('span').forEach(s => {
            s.classList.add("revealed")
        })
    }

    init() {
        let words = []
        this.text.split(' ').forEach(word => {

            // Create each span, add to element in DOM
            let span = document.createElement('span')
            span.textContent = word + ' '
            this.element.appendChild(span)

            // Get desired speed depending on word
            let wordSpeed = this.speed
            switch (word[word.length-1]) {
                case '.': 
                case '!': 
                case '?': wordSpeed *= this.periodSpeed; break

                case ',': wordSpeed *= this.commaSpeed; break
            }

            // Add this span to our internal state Array
            words.push({
                span, 
                delayAfter: wordSpeed
            })
        })

        this.revealOneWord(words)
    }
}