class RevealingText {
    constructor(config) {
        this.element = config.element
        this.voice = config.voice
        this.sfx = this.voice.sfx || null
        this.text = config.text
        this.speedMult = (this.voice.speed || 1) * config.speedMult
        this.speed = 100 / this.speedMult

        this.interruptSpeed = 5
        this.periodSpeed = 5
        this.commaSpeed = 3
        this.syllableSpeed = 0.7
        this.variation = 40

        this.timeout = null
        this.callback = null
        this.isDone = false
    }

    revealOneWord(list) {
        const next = list.splice(0, 1)[0]
        next.span.classList.add("revealed")

        if (next.span.textContent !== '.' && next.span.textContent !== ' ' && this.sfx !== null) {
            new AudioManager().playSFX(this.sfx)
        }

        if (list.length > 0) {
            this.timeout = setTimeout(() => {
                this.revealOneWord(list)
            }, next.delayAfter) 
        } else {           
            this.isDone = true
            if (this.callback) {
                this.callback()
            }
        }
    }

    warpToDone() {
        clearTimeout(this.timeout)
        this.isDone = true

        this.element.querySelectorAll('span').forEach(s => {
            s.classList.add("revealed")
        })
        if (this.callback) {
            this.callback()
        }
    }

    init(callback) {
        this.callback = callback
        let words = []
        this.text = this.text.replaceAll('...', ' . . .')
        
        Object.keys(SPLIT_WORDS).forEach(key => {
            this.text = this.text.replaceAll(key, SPLIT_WORDS[key])
        })
        
        // Multi-syllabic word = multiple words, but without separating spaces.
        // next word shouldn't have a leading space, and should use syllable speed
        this.text = this.text.replaceAll('--', ' *')

        // Sentence interruped.
        // Next sentence should have a leading space.
        this.text = this.text.replaceAll('- ', '_ ')

        // Hyphenated word = Two separate words, but with no space.
        // Next word shouldn't have a leading space, and should use regular speed
        this.text = this.text.replaceAll('-', '- @')

        this.text.split(' ').forEach(word => {

            // Create each span, add to element in DOM
            let span = document.createElement('span')
            span.textContent = word 
            if (word !== '.' && word[0] !== '*' && word[0] !== '@') {
                span.textContent = ' ' + span.textContent
            }
            this.element.appendChild(span)

            // Get desired speed depending on word
            let wordSpeed = this.speed
            switch (word[word.length-1]) {
                case '.':
                    if (word.length === 1) {
                        wordSpeed *= this.commaSpeed
                        break
                    }
                case '!': 
                case '?': wordSpeed *= this.periodSpeed; break

                case ',': wordSpeed *= this.commaSpeed; break

                case '_': wordSpeed *= this.interruptSpeed; break

                case '-': wordSpeed *= this.syllableSpeed; break
            }

            if (word[0] === '*') {
                wordSpeed *= this.syllableSpeed;
                span.textContent = word.substring(1)
            }
            if (word[0] === '@') {
                span.textContent = word.substring(1)
            }

            if (span.textContent[span.textContent.length - 1] === '_') {
                span.textContent = span.textContent.replace('_', '-')
            }

            // Add some variation to make things a little more natural
            wordSpeed += Math.floor(Math.random() * this.variation)

            // Add this span to our internal state Array
            words.push({
                span, 
                delayAfter: wordSpeed
            })
        })

        this.revealOneWord(words)
    }
}