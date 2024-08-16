class DungeonInput {
    constructor() {
        this.up = false
        this.jumpLock = false
        this.left = false
        this.right = false

        this.keyUp = this.keyUp.bind(this)
        this.keyDown = this.keyDown.bind(this)


        document.addEventListener("keydown", this.keyDown)
        document.addEventListener("keyup", this.keyUp)
    }

    keyDown (e) {
        switch (e.code) {
            case 'ArrowLeft':
                // keySafe = true
                this.left = true
                break
            case 'ArrowRight':
                this.right = true
                break
            case 'Space':
                if (!this.jumpLock) {
                    this.up = true
                }
                break
        }
    }

    keyUp(e) {
        switch (e.code) {
            case 'ArrowLeft':
                this.left = false
                break
            case 'ArrowRight':
                this.right = false
                break
            case 'Space':
                this.up = false
                this.jumpLock = false
                break
        }
    }
    

    unbind() {
        document.removeEventListener("keydown", this.keyDown)
        document.removeEventListener("keyup", this.keyUp)
    }
}