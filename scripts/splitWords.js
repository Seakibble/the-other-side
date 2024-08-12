let SPLIT_WORDS = {
    about: 'a--bout',
    actually: 'ac--tual--ly',
    admit: "ad--mit",
    again: 'ag--ain',
    allow: 'al--low',
    amnesia: 'am--nes--ia',
    answer: 'an--swer',
    appears: 'app--ears',
    apologize: 'ap--ol--o--gize',
    aside: 'a--side',
    avoid: 'av--oid',
    anyway: 'an--y--way',
    anything: 'an--y--thing',
    apparition: 'ap--pa--ri--tion',
    ahhhhhhhhhh: 'a--h--h--h--h--h--h--h--h--h--h',
    ahhhhh: 'a--h--h--h--h--h',
    awaken: 'a--wak--en',
    "aren't": "are--n't",

    believe: 'bel--ieve',
    between: 'be--tween',
    boundary: 'bound--ary',
    before: 'be--fore',
    broken: 'brok--en',

    colour: "col--our",
    completed: 'com--plet--ed',
    complicated: 'com--pli--cat--ed',
    crimson: 'crim--son',
    crying: 'cry--ing',
    convenient: 'con--ven--i--ent',
    "couldn't": "could--n't",
    collect: 'col--lect',
    consciousness: 'con--scious--ness',
    coming: 'com--ing',
    corpses: 'corpses',

    decor: "dec--or",
    "didn't": "did--n't",
    disconcerting: 'dis--con--cert--ing',
    "doesn't": "does--n't",
    domain: 'do--main',
    darkness: 'dark--ness',
    device: 'dev--ice',

    easy: 'ea--sy',
    eerie: 'eer--ie',
    entity: 'en--ti--ty',
    "everything": "ev--ery--thing",
    "everything's": "ev--ery--thing's",
    exactly: 'ex--act--ly',
    excuse: 'ex--cuse',
    expect: "ex--pect",
    explaining: 'ex--plain--ing',
    existing: 'ex--ist--ing',

    favourite: "fa--vour--ite",
    feeling: 'fee--ling',
    finished: "fin--ished",
    frustratingly: 'frus--trat--ing--ly',
    forever: 'for--ever',
    fellow: 'fel--low',

    going: "go--ing",
    greetings: 'greet--ings',
    given: "giv--en",

    hello: 'hel--lo',
    hopefully: 'hope--ful--ly',
    human: 'hu--man',
    hearing: 'hear--ing',
    happened: 'hap--pened',
    hmmmmm: 'h--m--m--m--m--m',
    hmmmm: 'h--m--m--m--m',
    hmmm: 'h--m--m--m',

    important: 'im--port--ant',
    importantly: 'im--port--ant--ly',
    inhabit: 'in--hab--it',
    inhabiting: 'in--hab--it--ing',
    interesting: 'in--ter--est-ing',
    interstitial: 'in--ter--stit--ial',
    intimidating: "in--tim--id--at--ing",
    into: 'in--to',
    introduce: 'in--tro--duce',
    intruiging: 'in--trui--ging',    
    injury: 'in--jur--y',

    killer: 'kill--er',

    living: 'liv--ing',
    little: "lit--tle",
    lovely: 'love--ly',

    melancholy: 'mel--an--chol--y',
    massive: 'mass--ive',
    minor: 'mi--nor',
    myself: 'my--self',

    never: "nev--er",
    narrative: 'nar--rat--ive',
    nasty: 'nas--ty',

    okay: 'o--kay',
    ominous: "om--in--ous",
    ominously: "om--in--ous--ly",
    obviously: 'ob--vi--ous--ly',
    offend: 'off--end',
    otherwise: 'oth--er--wise',

    pathetic: 'path--et--ic',
    panic: "pan--ic",
    pardon: "par--don",
    people: 'peop--le',
    purgatory: 'pur--ga--tor--y',
    probably: 'prob--ab--ly',
    possibly: 'pos--sib--ly',
    pleasant: 'pleas--ant',
    peasant: 'peas--ant',

    question: 'quest--ion',

    reassuring: "re--ass--ur--ing",
    relief: 're--lief',
    rhetorical: "rhet--or--ic--al",
    really: 'real--ly',

    sinister: "sin--is--ter",
    sinking: 'sin--king',
    sensitive: 'sen--si--tive',
    somehow: 'some--how',
    someone: 'some--one',
    somewhere: 'some--where',
    sorry: 'sor--ry',
    supposed: 'sup--posed',
    swallowed: 'swall--owed',
    saying: 'say--ing',
    snowflake: 'snowflake',
    surprisingly: 'sur--pris--ing--ly',

    technicality: 'tech--nic--al--ity',
    thinking: 'think--ing',
    traditional: 'tra--di--tion--al',
    trying: 'try--ing',
    talking: 'talk--ing',

    understatement: 'un--der--state--ment',
    unhelpful: 'un--help--ful',
    unhelpfully: 'un--help--ful--ly',
    uhhhhh: 'u--h--h--h--h--h',
    uhhhh: 'u--h--h--h--h',
    uhhh: 'u--h--h--h',

    voices: 'voic--es',

    "wouldn't": "would--n't",
    worry: 'wor--ry',
    worrying: 'wor--ry--ing',
    without: 'with--out',
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