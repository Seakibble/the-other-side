class OverworldCamera {
    constructor() {
        this.map = null
        this.pos = new Vector(0,0)
        this.posRounded = null
        this.target = null
    }

    // MARK: setMap
    setMap(map) {
        this.map = map
    }

    // MARK: getPos
    getPos() {
        return this.posRounded
    }

    // MARK: setTarget
    setTarget(target) {
        if (Array.isArray(target)) {
            let targets = []
            target.forEach(obj => {
                if (this.map.gameObjects[obj]) {
                    targets.push(this.map.gameObjects[obj])
                }
            })
            this.target = targets
        } else if (this.map.gameObjects[target]) {
            this.target = this.map.gameObjects[target]
        }
    }

    // MARK: update
    update() {
        // Establish the camera person if they're not defined
        if (this.target === null && this.map.gameObjects.hero) {
            this.target = this.map.gameObjects.hero
            this.camera = {
                x: this.target.x,
                y: this.target.y
            }
        }
        
        
        if (this.target !== null) {
            let averageCamera = {
                x: 0,
                y: 0
            }
            if (Array.isArray(this.target)) {
                this.target.forEach(obj => {
                    averageCamera.x += obj.x
                    averageCamera.y += obj.y
                })
                averageCamera.x /= this.target.length
                averageCamera.y /= this.target.length
            } else {
                averageCamera = this.target
            }

            // Lerp Camera
            if (Math.round(this.camera.x) != Math.round(averageCamera.x)
                || Math.round(this.camera.y) != Math.round(averageCamera.y)) {
                let distX = (averageCamera.x - this.camera.x) / 20
                let distY = (averageCamera.y - this.camera.y) / 20

                // if (distX > 0) {
                //     distX = Math.ceil(distX)
                // } else {
                //     distX = Math.floor(distX)
                // }
                // if (distY > 0) {
                //     distY = Math.ceil(distY)
                // } else {
                //     distY = Math.floor(distY)
                // }
        
                this.camera.x += distX
                this.camera.y += distY
            }

            this.posRounded = {
                x: Math.round(this.camera.x) + GAME_GRID_SIZE / 2,
                y: Math.round(this.camera.y) - GAME_GRID_SIZE / 2
            }
            // cameraRounded = {
            //     x: this.camera.x + GAME_GRID_SIZE / 2,
            //     y: this.camera.y - GAME_GRID_SIZE / 2
            // }
        }
    }
}