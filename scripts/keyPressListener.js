class KeyPressListener {
    constructor(keyCode, callbackDown, callbackUp = null) {
        if (!Array.isArray(keyCode)) {
            keyCode = [keyCode]
        }
        let keySafe = true

        this.keydownFunction = function (event) {
            if (keyCode.includes(event.code)) {
                if (keySafe) {
                    keySafe = false
                    if (callbackDown) callbackDown(event.code)
                }
            }
        }
        this.keyupFunction = function (event) {
            if (keyCode.includes(event.code)) {
                keySafe = true
                if (callbackUp) callbackUp(event.code)
            }
        }

        document.addEventListener("keydown", this.keydownFunction)
        document.addEventListener("keyup", this.keyupFunction)
    }

    // MARK: unbind
    unbind() {
        document.removeEventListener("keydown", this.keydownFunction)
        document.removeEventListener("keyup", this.keyupFunction)
    }
}