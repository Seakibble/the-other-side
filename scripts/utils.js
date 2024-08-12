let SCREEN_CENTER_X = 10.5
let SCREEN_CENTER_Y = 6

const SPRITE_GRID_SIZE = 32
const GAME_GRID_SIZE = 16

const SPIRTE_OFFSET_X = -8
const SPIRTE_OFFSET_Y = -18

const utils = {
    withGrid(n) {
        return n * GAME_GRID_SIZE
    },

    asGridCoord(x, y) {
        return `${x * GAME_GRID_SIZE},${y * GAME_GRID_SIZE}`
    },

    nextPosition(initialX, initialY, direction) {
        let x = initialX
        let y = initialY
        if (direction == 'left') {
            x -= GAME_GRID_SIZE
        } else if (direction == 'right') {
            x += GAME_GRID_SIZE
        } else if (direction == 'up') {
            y -= GAME_GRID_SIZE
        } else if (direction == 'down') {
            y += GAME_GRID_SIZE
        }
        return {x,y}
    },

    oppositeDirection(direction) {
        if (direction === "right") { return "left" }
        if (direction === "left") { return "right" }
        if (direction === "up") { return "down" }
        return "up"
    },

    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        })
        document.dispatchEvent(event)
    },
    isObject(obj) {
        return typeof obj === 'object' && obj !== null
    },

    clone(obj, n = 0) {
        console.log(obj, n)
        // alert('HI')
        if (!utils.isObject(obj)) {
            return obj
        }

        let clonedObj = {}
        Object.keys(obj).forEach(key => {
            if (Array.isArray(obj)) {
                return JSON.parse(JSON.stringify(obj))
            } else if (utils.isObject(obj)) {
                clonedObj[key] = this.clone(obj[key], n+1 )
            } else {
                clonedObj[key] = obj[key]
            }
        })
        return clonedObj
    },

    ellipsis() {
        return `<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>`
    }
}