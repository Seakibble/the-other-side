class RoomTitle {
    constructor(config) {
        this.element = config.element
        this.text = config.text
    }

    // MARK: createElement
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("roomTitle")

        this.text = this.text.split('')
        let title = ''
        this.text.forEach(char => {
            let offset = Math.floor(Math.random() * -2000)
            let duration = Math.floor(Math.random() * 2000) + 2000
            title += `<span style="animation-delay:${offset}ms; animation-duration:${duration}ms;">${char}</span>`
        });

        this.element.innerHTML = (`<h2>${title}</h2>`)
    }


    // MARK: init
    init(container) {
        this.createElement()
        container.appendChild(this.element)
    }
}