class KeyPressListener {
    constructor(keyCode, callbackDown, callbackUp = null) {
        let keySafe = true

        this.keydownFunction = function (event) {
            if (event.code === keyCode) {
                if (keySafe) {
                    keySafe = false
                    if (callbackDown) callbackDown()
                }
            }
        }
        this.keyupFunction = function (event) {
            if (event.code === keyCode) {
                keySafe = true
                if (callbackUp) callbackUp()
            }
        }

        document.addEventListener("keydown", this.keydownFunction)
        document.addEventListener("keyup", this.keyupFunction)
    }

    unbind() {
        document.removeEventListener("keydown", this.keydownFunction)
        document.removeEventListener("keyup", this.keyupFunction)
    }
}