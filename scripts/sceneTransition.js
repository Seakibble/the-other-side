class SceneTransition {
    constructor() {
        this.element = null
    } 

    // MARK: createElement
    createElement() {
        this.element = document.createElement('div')
        this.element.classList.add('sceneTransition')
    }

    // MARK: fadeOut
    fadeOut() {
        this.element.classList.add('fade-out')
        this.element.addEventListener("animationend", () => {
            this.element.remove()
        }, { once: true })
    }

    // MARK: init
    init(container, callback) {
        this.createElement()
        container.appendChild(this.element)

        this.element.addEventListener("animationend", () => {
            callback()
        }, {once: true})
    }
}