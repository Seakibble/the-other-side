let SCREEN_CENTER_X = 10.5
let SCREEN_CENTER_Y = 6

let DUNGEON_SCREEN_CENTER_X = 0
let DUNGEON_SCREEN_CENTER_Y = 0

const SPRITE_GRID_SIZE = 32
const GAME_GRID_SIZE = 16

const SPIRTE_OFFSET_X = -8
const SPIRTE_OFFSET_Y = -18

const OVERWORLD_GRAVITY = 0.17
const OVERWORLD_JUMP_FORCE = 2

const utils = {
    // MARK: withGrid
    withGrid(n) {
        return n * GAME_GRID_SIZE
    },

    // MARK: asGridCoord
    asGridCoord(x, y) {
        return `${x * GAME_GRID_SIZE},${y * GAME_GRID_SIZE}`
    },

    // MARK: nextPosition
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

    // MARK: oppositeDirection
    oppositeDirection(direction) {
        if (direction === "right") { return "left" }
        if (direction === "left") { return "right" }
        if (direction === "up") { return "down" }
        return "up"
    },

    // MARK: emitEvent
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        })
        document.dispatchEvent(event)
    },

    // MARK: isObject
    isObject(obj) {
        return typeof obj === 'object' && obj !== null
    },

    // MARK: clone
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

    // MARK: ellipsis
    ellipsis() {
        return `<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>`
    }
}