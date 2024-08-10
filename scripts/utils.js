let SCREEN_CENTER_X = 10.5
let SCREEN_CENTER_Y = 6

const SPRITE_GRID_SIZE = 32
const GAME_GRID_SIZE = 16

const SPIRTE_OFFSET_X = -8
const SPIRTE_OFFSET_Y = -18

let SPLIT_WORDS = {
    actually: 'ac--tu--al--ly',
    admit: "ad--mit",
    answer: 'an--swer',
    appears: 'app--ears',
    apologize: 'ap--ol--o--gize',
    aside: 'a--side',
    avoid: 'av--oid',
    anyway: 'an--y--way',
    apparition: 'ap--pa--ri--tion',

    believe: 'bel--ieve',
    between: 'be--tween',
    boundary: 'bound--ary',
    before: 'be--fore',

    colour: "col--our",
    completed: 'com--plet--ed',
    complicated: 'com--pli--cat--ed',
    crying: 'cry--ing',

    decor: "dec--or",
    "didn't": "did--n't",
    disconcerting: 'dis--con--cert--ing',
    "doesn't": "does--n't",
    domain: 'do--main',
    darkness: 'dark--ness',

    easy: 'ea--sy',
    entity: 'en--ti--ty',
    "everything": "ev--ery--thing",
    "everything's": "ev--ery--thing's",
    exactly: 'ex--act--ly',
    excuse: 'ex--cuse',
    expect: "ex--pect",

    favourite: "fa--vour--ite",
    finished: "fin--ished",
    frustratingly: 'frus--trat--ing--ly',

    going: "go--ing",
    greetings: 'greet--ings',
    
    hello: 'hel--lo',
    hopefully: 'hope--ful--ly',
    human: 'hu--man',

    interesting: 'in--ter--est-ing',
    interstitial: 'in--ter--stit--ial',
    intimidating: "in--tim--id--at--ing",
    intruiging: 'in--trui--ging',    

    living: 'liv--ing',
    little: "lit--tle",
    
    melancholy: 'mel--an--chol--y',
    massive: 'mass--ive',
    minor: 'mi--nor',

    never: "nev--er",

    okay: 'o--kay',
    ominous: "om--in--ous",

    panic: "pan--ic",
    pardon: "par--don",
    purgatory: 'pur--ga--tor--y',

    question: 'quest--ion',

    reassuring: "re--ass--ur--ing",
    relief: 're--lief',

    sinister: "sin--is--ter",
    sorry: 'sor--ry',    
    
    technicality: 'tech--nic--al--ity',
    traditional: 'tra--di--tion--al',
    trying: 'try--ing',
    
    unhelpful: 'un--help--ful',
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