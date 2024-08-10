window.OverworldMaps = {
    DeathLand: {
        id: "DeathLand",
        music: "crossing-to-the-other-side",
        lowerSrc: "images/maps/DeathLandLower.png",
        upperSrc: "images/maps/DeathLandUpper.png",
        configObjects: {
            hero: {
                type: 'Person',
                x: utils.withGrid(10),
                y: utils.withGrid(3),
                direction: 'right',
                isPlayerControlled: true,
                voice: voices.hero
            },
            death: {
                type: 'Person',
                x: utils.withGrid(15),
                y: utils.withGrid(3),
                voice: voices.death,
                direction: 'left',
                src: "images/characters/people/death.png",
                behaviourLoop: [
                ],
                talking: [
                    {
                        events: []
                    },
                    {
                        events: []
                    }
                ]
            },
            npcA: {
                type: 'Person',
                x: utils.withGrid(15),
                y: utils.withGrid(100),
                voice: voices.monkDude,
                direction: 'left',
                src: "images/characters/people/death.png",
                behaviourLoop: [
                ],
                talking: [
                    {
                        required: ["TALKED_TO_ERIO"],
                        events: [
                            // { type: 'textMessage', text: "Isn't Erio the coolest?", faceHero: "npcA" },
                            // { type: 'textMessage', text: "I think he's a bit of an asshole, honestly.", who: 'hero'}
                        ]
                    },
                    {
                        events: [
                            // { type: "textMessage", text: "Hi!", who: 'hero' },
                        ]
                    }
                ]
            },
            // npcB: {
            //     type: 'Person',
            //     x: utils.withGrid(8),
            //     y: utils.withGrid(5),
            //     voice: voices.monkDude,
            //     src: "images/characters/people/npc2.png",
            //     behaviourLoop: [
                    // { type: 'addStoryFlag', flag: "ERIO_PRESENT" },
                    // { type: "stand", direction: "down", time: 5000 },
                    // { type: 'removeStoryFlag', flag: "ERIO_PRESENT" },
                    // { type: "walk", direction: "right" },
                    // { type: "walk", direction: "right" },
                    // { type: "walk", direction: "up" },
                    // { type: "stand", direction: "up", time: 5000 },
                    // { type: "walk", direction: "left" },
                    // { type: "walk", direction: "down" },
                    // { type: "walk", direction: "left" },
                // ],
                // talking: [
                //     {
                //         events: [
                //             { type: "textMessage", text: "What? You need something?", faceHero: "npcB" },
                //             { type: "textMessage", text: "No? Then get lost buddy. I'm very busy thinking hard about what my next words will be. Or something to that effect, I suppose." },
                //             { type: "textMessage", text: "Could you be less of an asshole, please?", who: "hero" },
                //             { type: "textMessage", text: "..." },
                //             { type: "textMessage", text: "Screw off." },
                //             { type: 'addStoryFlag', flag: "TALKED_TO_ERIO" }
                //         ]
                //     }
                // ]
                // behaviourLoop: [
                //     { type: "walk", direction: "left" },
                //     { type: "stand", direction: "up", time: 800 },
                //     { type: "walk", direction: "up" },
                //     { type: "walk", direction: "right" },
                //     { type: "walk", direction: "down" },
                // ]
            // }
        },
        walls: {
            [utils.asGridCoord(-1, 2)]: true, [utils.asGridCoord(-1, 3)]: true,
            [utils.asGridCoord(-1, 4)]: true, [utils.asGridCoord(-1, 5)]: true,

            [utils.asGridCoord(24, 2)]: true, [utils.asGridCoord(24, 3)]: true,
            [utils.asGridCoord(24, 4)]: true, [utils.asGridCoord(24, 5)]: true,

            [utils.asGridCoord(0, 0)]: true,    [utils.asGridCoord(0, 1)]: true, [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(1, 0)]: true,    [utils.asGridCoord(1, 1)]: true, [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(2, 0)]: true,    [utils.asGridCoord(2, 1)]: true, [utils.asGridCoord(2, 6)]: true,
            [utils.asGridCoord(3, 0)]: true,    [utils.asGridCoord(3, 1)]: true, [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(4, 0)]: true,    [utils.asGridCoord(4, 1)]: true, [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(5, 0)]: true,    [utils.asGridCoord(5, 1)]: true, [utils.asGridCoord(5, 6)]: true,
            [utils.asGridCoord(6, 0)]: true,    [utils.asGridCoord(6, 1)]: true, [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(7, 0)]: true,    [utils.asGridCoord(7, 1)]: true, [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 0)]: true,    [utils.asGridCoord(8, 1)]: true, [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(9, 0)]: true,    [utils.asGridCoord(9, 1)]: true, [utils.asGridCoord(9, 6)]: true,
            [utils.asGridCoord(10, 0)]: true,   [utils.asGridCoord(10, 1)]: true, [utils.asGridCoord(10, 6)]: true,
            [utils.asGridCoord(11, 0)]: true,   [utils.asGridCoord(11, 1)]: true, [utils.asGridCoord(11, 6)]: true,
            [utils.asGridCoord(12, 0)]: true,   [utils.asGridCoord(12, 1)]: true, [utils.asGridCoord(12, 6)]: true,
            [utils.asGridCoord(13, 0)]: true,   [utils.asGridCoord(13, 1)]: true, [utils.asGridCoord(13, 6)]: true,
            [utils.asGridCoord(14, 0)]: true,   [utils.asGridCoord(14, 1)]: true, [utils.asGridCoord(14, 6)]: true,
            [utils.asGridCoord(15, 0)]: true,   [utils.asGridCoord(15, 1)]: true, [utils.asGridCoord(15, 6)]: true,
            [utils.asGridCoord(16, 0)]: true,   [utils.asGridCoord(16, 1)]: true, [utils.asGridCoord(16, 6)]: true,
            [utils.asGridCoord(17, 0)]: true,   [utils.asGridCoord(17, 1)]: true, [utils.asGridCoord(17, 6)]: true,
            [utils.asGridCoord(18, 0)]: true,   [utils.asGridCoord(18, 1)]: true, [utils.asGridCoord(18, 6)]: true,
            [utils.asGridCoord(19, 0)]: true,   [utils.asGridCoord(19, 1)]: true, [utils.asGridCoord(19, 6)]: true,
            [utils.asGridCoord(20, 0)]: true,   [utils.asGridCoord(20, 1)]: true, [utils.asGridCoord(20, 6)]: true,
            [utils.asGridCoord(21, 0)]: true,   [utils.asGridCoord(21, 1)]: true, [utils.asGridCoord(21, 6)]: true,
            [utils.asGridCoord(22, 0)]: true,   [utils.asGridCoord(22, 1)]: true, [utils.asGridCoord(22, 6)]: true,
            [utils.asGridCoord(23, 0)]: true,   [utils.asGridCoord(23, 1)]: true, [utils.asGridCoord(23, 6)]: true,
            
        },
        cutsceneSpaces: {
            [utils.asGridCoord(11, 2)]: [
                {
                    events: [
                        { who: "hero", type: "walk", direction: "down" },
                    ]
                }
            ],
            [utils.asGridCoord(11, 4)]: [
                {
                    events: [
                        { who: "hero", type: "walk", direction: "up" },
                    ]
                }
            ],
            [utils.asGridCoord(11, 5)]: [
                {
                    events: [
                        { who: "hero", type: "walk", direction: "up" },
                    ]
                }
            ],
            [utils.asGridCoord(11, 3)]: [
                {
                    // required: ["ERIO_PRESENT"],
                    events: [
                        { type: 'letterbox', enable: true },
                        { type: "focus", who: ["death", "hero"] },
                        { who: "hero", type: "stand", direction: "right" },
                        { type: 'wait', duration: 500 },

                        { type: "textMessage", text: "An apparition of darkness stands before you.", voice: 'narrator'},

                        { who: 'npcA', type: "textMessage", focus: 'death', text: "..."},
                        { who: 'npcA', type: "textMessage", text: "..." },
                        { who: 'npcA', type: "textMessage", text: "Intruiging." },

                        { who: "hero", type: "backstep", direction: "left" },
                        { who: 'hero', type: "textMessage", text: "Hello?", speedMult: 0.7 },

                        { who: 'npcA', type: "textMessage", text: "Greetings, human." },

                        { who: "hero", type: "walk", direction: "right" },
                        { who: 'hero', type: "textMessage", text: "Who... are you?", speedMult: 0.5},

                        { who: 'npcA', type: "textMessage", text: "Ah, a traditional question." },                        
                        { who: "death", type: "walk", direction: "right" },
                        { type: "wait", duration: 1200 },
                        { who: 'npcA', type: "textMessage", text: "I am no one." },

                        { type: "textMessage", text: "You sense a shred of melancholy from the strange entity.", voice: 'narrator' },

                        { who: 'hero', type: "textMessage", text: "I beg your pardon?" },

                        { who: "death", type: "stand", direction: "left" },

                        { who: 'npcA', type: "textMessage", text: "I must apologize. That must seem like a frustratingly unhelpful answer." },

                        { who: 'hero', type: "textMessage", text: "It was a bit unhelpful, yeah." },

                        { who: 'npcA', type: "textMessage", text: "You may call me..." },
                        { type: "zoom", level: 4 },
                        { type: "wait", duration: 1000 },
                        { who: 'npcA', type: "textMessage", text: "Death.", voice: "deathEchoDelay" },

                        { type: "zoom", level: 2 },
                        { who: "hero", type: "backstep", direction: "left" },
                        { who: "hero", type: "stand", direction: "right" },
                        { type: "wait", duration: 1500 },

                        { who: 'hero', type: "textMessage", text: "Oh. Well, that's disconcerting." },

                        { type: "textMessage", text: "You got that right.", voice: 'narrator' },
                        
                        { who: 'death', type: "textMessage", text: "Yeah, I get that a lot." },

                        { who: 'hero', type: "textMessage", text: "So... if you're Death, does that mean I'm... uh..." },
                        
                        { type: "wait", duration: 2000 },
                        { who: "death", type: "walk", direction: "left" },

                        { who: 'death', type: "textMessage", text: "Oh! Oh no no, sorry! You're not dead." },

                        { who: 'hero', type: "textMessage", text: "Whew! Well, that's a massive relief!" },

                        { type: "wait", duration: 1000 },
                        { who: 'death', type: "textMessage", text: "Well, actually... you are dead. Sort of. It's complicated." },

                        { who: 'hero', type: "textMessage", text: "Oh my God! I can't believe this! I'm dead! I'm actually dead!" },
                        { who: "hero", type: "walk", direction: "down" },
                        { who: "hero", type: "walk", direction: "up" },
                        { who: "hero", type: "walk", direction: "up" },
                        { who: "hero", type: "walk", direction: "down" },
                        { who: 'hero', type: "textMessage", text: "Ahhhh!!!" },

                        { who: 'death', type: "textMessage", text: "Ugh. This is exactly what I was trying to avoid." },                       
                        { who: "death", type: "walk", direction: "left" },
                        { who: 'death', type: "textMessage", text: "Look. Calm down. It's okay. You're okay. Everything's going to be fine. There's no need to panic.", speedMult: 1.25 },
                        
                        { who: "hero", type: "walk", direction: "right" },
                        { who: 'hero', type: "textMessage", text: "Easy for you to say! You're not the one who's dead!" },

                        { who: "death", type: "stand", direction: "down" },
                        { who: 'death', type: "textMessage", text: "Actually, as a minor technicality, I am dead too. But that's an aside.", speedMult: 1.25 },

                        { who: "hero", type: "stand", direction: "left" },
                        { who: 'hero', type: "textMessage", text: "Oh for crying out loud." },                        
                        { who: "hero", type: "walk", direction: "right" },
                        { who: 'hero', type: "textMessage", text: "What is this place? Am I in Hell?" },
                        
                        { who: "death", type: "stand", direction: "left" },
                        { who: 'death', type: "textMessage", text: "Ah! No. This is not Hell. This is an interstitial boundary domain between the world of the living and the world of the dead. In short, you're in...", speedMult: 1.25 },
                        { who: 'death', type: "textMessage", text: "Purgatory.", voice: 'deathEcho', speedMult: 0.33},

                        { who: 'hero', type: "textMessage", text: "That doesn't sound very reassuring." },

                        { who: 'death', type: "textMessage", text: "That bit's not really meant to be reassuring." },
                        { who: 'death', type: "textMessage", text: "Why did you think this was Hell anyway? Did you expect to go there?" },

                        { who: 'hero', type: "textMessage", text: "I... don't know. It looks sinister? It's very ominious... and red?" },

                        { who: 'death', type: "textMessage", text: "Red's just my favourite colour!" },

                        { who: 'hero', type: "textMessage", text: "I didn't mean to knock it. But you have to admit, the decor is a little intimidating." },

                        { who: 'death', type: "textMessage", text: "You do have a point. Sorry about that." },
                        


                        { who: "death", type: "stand", direction: "down" },
                        { who: "hero", type: "stand", direction: "down" },

                        { who: 'death', type: "textMessage", text: "Oh dear. This appears to be the end of the script. Hopefully it gets completed soon." },
                        { who: 'hero', type: "textMessage", text: "Nah, I'm sure it'll never get finished. I bet you these words will never change." },

                        { type: "textMessage", text: "You lot have no faith in me, do you?", voice: 'narrator' },
                        { who: 'hero', type: "textMessage", text: "Nope! None at all!" },

                        { who: "hero", type: "walk", direction: "left" },
                        { who: "hero", type: "walk", direction: "left" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "stand", direction: "left" },
                        { who: "hero", type: "stand", direction: "right" },
                        { type: 'letterbox', enable: false },
                        { type: "zoom", level: 1 },
                    ]
                }
            ],
        }
    },
    Kitchen: {
        id: "Kitchen",
        // music: "track-02",
        lowerSrc: "images/maps/KitchenLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                x: utils.withGrid(5),
                y: utils.withGrid(5),
                isPlayerControlled: true
            },
            npcB: {
                type: "Person",
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "images/characters/people/npc3.png",
                talking: [
                    {
                        required: ['JIM_1'],
                        events: [
                            { type: "textMessage", text: "I ain't got no more to say buddy.", faceHero: "npcB" }
                        ]
                    },
                    {
                        events: [
                            { type: "textMessage", text: "You made it!", faceHero: "npcB" },
                            { type: "textMessage", text: "Hmmmm... I wonder what to make for lunch?" },
                            { type: 'addStoryFlag', flag: "JIM_1" },
                        ]
                    }
                    
                ]
            }
        },
        cutsceneSpaces: {
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "DemoRoom",
                            x: utils.withGrid(5),
                            y: utils.withGrid(10),
                            direction: "up"
                        },
                    ]
                }
            ],
        }
    }
}