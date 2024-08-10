let SCREEN_CENTER_X = 10.5
let SCREEN_CENTER_Y = 6

const SPRITE_GRID_SIZE = 32
const GAME_GRID_SIZE = 16

const SPIRTE_OFFSET_X = -8
const SPIRTE_OFFSET_Y = -18

let SPLIT_WORDS = {
    greetings: 'greet--ings',
    hello: 'hel--lo',
    human: 'hu--man',
    interesting: 'in--ter--est-ing',
    traditional: 'tra--di--tion--al',
    intruiging: 'in--trui--ging',
    question: 'quest--ion',
    apologize: 'ap--ol--o--gize',
    frustratingly: 'frus--trat--ing--ly',
    unhelpful: 'un--help--ful',
    answer: 'an--swer',
    sorry: 'sor--ry',
    excuse: 'ex--cuse',
    massive: 'mass--ive',
    relief: 're--lief',
    disconcerting: 'dis--con--cert--ing',
    actually: 'ac--tu--al--ly',
    complicated: 'com--pli--cat--ed',
    believe: 'bel--ieve',
    exactly: 'ex--act--ly',
    trying: 'try--ing',
    avoid: 'av--oid',
    okay: 'o--kay',
    easy: 'ea--sy',
    minor: 'mi--nor',
    technicality: 'tech--nic--al--ity',
    aside: 'a--side',
    crying: 'cry--ing',
    interstitial: 'in--ter--stit--ial',
    boundary: 'bound--ary',
    domain: 'do--main',
    between: 'be--tween',
    living: 'liv--ing',
    purgatory: 'pur--ga--tor--y',
    "doesn't": "does--n't",
    reassuring: "re--ass--ur--ing",
    expect: "ex--pect",
    sinister: "sin--is--ter",
    ominous: "om--in--ous",
    favourite: "fa--vour--ite",
    colour: "col--our",
    "didn't": "did--n't",
    admit: "ad--mit",
    decor: "dec--or",
    little: "lit--tle",
    intimidating: "in--tim--id--at--ing",
}

Object.keys(SPLIT_WORDS).forEach(key => {
    let newKey = key.split('')
    let newValue = SPLIT_WORDS[key].split('')

    newKey[0] = newKey[0].toUpperCase()
    newKey = newKey.join('')
    newValue[0] = newValue[0].toUpperCase()
    newValue = newValue.join('')

    SPLIT_WORDS[newKey] = newValue
})

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
    }
}