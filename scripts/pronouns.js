window.pronounMaps = {
    they: [
        { from:"[they]",    to: "they" },
        { from:"[they're]", to: "they're" },
        { from:"[they'll]", to: "they'll" },
        { from:"[they'd]",  to: "they'd" },
        { from:"[them]",    to: "them" },
        { from:"[their]",   to: "their" },
        { from:"[their's]", to: "their's" },
    ],
    she: [
        { from:"[they]",    to: "she" },
        { from:"[they're]", to: "she's" },
        { from:"[they'll]", to: "she'll" },
        { from:"[they'd]",  to: "she'd" },
        { from:"[them]",    to: "her" },
        { from:"[their]",   to: "her" },
        { from:"[their's]", to: "her's" },
    ],
    he: [
        { from:"[they]",    to: "he" },
        { from:"[they're]", to: "he's" },
        { from:"[they'll]", to: "he'll" },
        { from:"[they'd]",  to: "he'd" },
        { from:"[them]",    to: "him" },
        { from:"[their]",   to: "his" },
        { from:"[their's]", to: "his" },
    ]
}

Object.values(window.pronounMaps).forEach(map => {
    for (let i = map.length-1; i >= 0; i--) {
        map.push({
            from: map[i].from.toUpperCase(),
            to: map[i].to.toUpperCase()
        })
        let firstCapFrom = map[i].from.split('')
        firstCapFrom[1] = firstCapFrom[1].toUpperCase()
        firstCapFrom = firstCapFrom.join('')
    
        let firstCapTo = map[i].to.split('')
        firstCapTo[0] = firstCapTo[0].toUpperCase()
        firstCapTo = firstCapTo.join('')
        map.push({
            from: firstCapFrom,
            to: firstCapTo
        })
    }
})

// for (let i = 0; i < map.length; i++) {
//     newMap.push(map[i])
//     newMap.push({
//         from: map[i].from.toUpperCase(),
//         to: map[i].to.toUpperCase()
//     })
//     let firstCapFrom = map[i].from.split('')
//     firstCapFrom[1] = firstCapFrom[1].toUpperCase()
//     firstCapFrom = firstCapFrom.join('')

//     let firstCapTo = map[i].to.split('')
//     firstCapTo[0] = firstCapTo[0].toUpperCase()
//     firstCapTo = firstCapTo.join('')
//     newMap.push({
//         from: firstCapFrom,
//         to: firstCapTo
//     })
// }