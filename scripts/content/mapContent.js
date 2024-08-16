window.OverworldMaps = {
    DeathLand: {
        id: "DeathLand",
        music: "crossing-to-the-other-side",
        lowerSrc: "images/maps/DeathLandLower.png",
        upperSrc: "images/maps/DeathLandUpper.png",
        background: "radial-gradient(circle, rgba(20,0,0,1) 0%, rgba(2,0,0,1) 100%);",
        configObjects: {
            flame: {
                type: 'Flame',
                x: utils.withGrid(5),
                y: utils.withGrid(2),
            },
            flame2: {
                type: 'Flame',
                x: utils.withGrid(5),
                y: utils.withGrid(4),
            },
            flame3: {
                type: 'Flame',
                x: utils.withGrid(5),
                y: utils.withGrid(5),
            },
            battleFlame: {
                type: 'Flame',
                x: utils.withGrid(0),
                y: utils.withGrid(5),
                talking: [
                    {
                        events: [
                            {type: 'dungeon'}
                        ]
                    }
                ]
            },
            hero: {
                type: 'Person',
                x: utils.withGrid(2),
                y: utils.withGrid(3),
                direction: 'right',
                isPlayerControlled: true,
                voice: voices.hero
            },
            death: {
                type: 'Person',
                x: utils.withGrid(19),
                y: utils.withGrid(3),
                voice: voices.death,
                direction: 'up',
                src: "images/characters/people/death.png",
                excludes: ["DEATH_MOVED"],
                behaviourLoop: [
                ],
                talking: [
                    {
                        events: [
                            { type: "zoom", level: 3 },
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },
                            { type: 'textMessage', text: "Death stands before you, ominiously existing.", voice: "narrator" },
                            
                            { type: 'textMessage', text: "Oh, hello again!", faceHero: "death" },

                            { type: 'textMessage', text: "Hello. Did you kill me?", voice: "hero" },
                            
                            { type: 'textMessage', text: "How dare you! I'm not a killer! I just collect the dead!" },
                            
                            { type: 'textMessage', text: "Sorry, I didn't mean to offend you.", voice: "hero" },
                            
                            { type: 'textMessage', text: "Ugh. No no, I'm sorry. Most people aren't a fan of Death. I get a lot of hate." },
                            { type: 'textMessage', text: "But like, without me coming to collect them, people would just be continuing to inhabit their broken corpses. Forever." },

                            { type: 'textMessage', text: "Yikes. Is that really how that works?", voice: "hero" },

                            { type: 'textMessage', text: "Oh yeah. When you die, someone has to pry your consciousness out of your body, otherwise it would just stay there until your bones turn to dust. It's happened before. Nasty stuff." },
                            { type: 'textMessage', text: "My job is to help souls move on once their body has given up. Then they can start again." },

                            { type: 'textMessage', text: "That actually sounds like really important work!", voice: "hero" },
                            { type: 'textMessage', text: 'Why did you have to say "actually?"' },
                            { type: 'textMessage', text: "I- Okay, I'll just shut up now.", voice: "hero" },
                            { type: 'textMessage', text: "Ugh. No, I'm just being a pain." },
                            { type: 'textMessage', text: "A real sensitive snowflake aren't they?", voice: "narrator" },
                            { type: 'textMessage', text: "Do you have to call them a snowflake?", voice: "hero" },
                            { type: 'textMessage', text: "Who are you talking to?" },
                            { type: 'textMessage', text: "Uhhhhh... myself?", voice: "hero", speedMult: 0.6 },
                            { type: 'textMessage', text: "You're a strange fellow." },
                            { type: 'textMessage', text: "That's an understatement.", voice: "narrator" },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                ]
            },
            npcA: {
                type: 'Person',
                x: utils.withGrid(10),
                y: utils.withGrid(100),
                voice: voices.monkDude,
                direction: 'left',
                src: "images/characters/people/death.png",
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
            // }
        },
        walls: {
            [utils.asGridCoord(-1, 2)]: true, [utils.asGridCoord(-1, 3)]: true,
            [utils.asGridCoord(-1, 4)]: true, [utils.asGridCoord(-1, 5)]: true,

            [utils.asGridCoord(24, 2)]: true, [utils.asGridCoord(24, 3)]: true,
            [utils.asGridCoord(24, 4)]: true, [utils.asGridCoord(24, 5)]: true,

            [utils.asGridCoord(0, 1)]: true, [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(1, 1)]: true, [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(2, 1)]: true, [utils.asGridCoord(2, 6)]: true,
            [utils.asGridCoord(3, 1)]: true, [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(4, 1)]: true, [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(5, 1)]: true, [utils.asGridCoord(5, 6)]: true,
            [utils.asGridCoord(6, 1)]: true, [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(7, 1)]: true, [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 1)]: true, [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(9, 1)]: true, [utils.asGridCoord(9, 6)]: true,
            [utils.asGridCoord(10, 1)]: true, [utils.asGridCoord(10, 6)]: true,
            [utils.asGridCoord(11, 1)]: true, [utils.asGridCoord(11, 6)]: true,
            [utils.asGridCoord(12, 1)]: true, [utils.asGridCoord(12, 6)]: true,
            [utils.asGridCoord(13, 1)]: true, [utils.asGridCoord(13, 6)]: true,
            [utils.asGridCoord(14, 1)]: true, [utils.asGridCoord(14, 6)]: true,
            [utils.asGridCoord(15, 1)]: true, [utils.asGridCoord(15, 6)]: true,
            [utils.asGridCoord(16, 1)]: true, [utils.asGridCoord(16, 6)]: true,
            [utils.asGridCoord(17, 1)]: true, [utils.asGridCoord(17, 6)]: true,
            [utils.asGridCoord(18, 1)]: true, [utils.asGridCoord(18, 6)]: true,
            [utils.asGridCoord(19, 1)]: true, [utils.asGridCoord(19, 6)]: true,
            [utils.asGridCoord(20, 1)]: true, [utils.asGridCoord(20, 6)]: true,
            [utils.asGridCoord(21, 0)]: true, [utils.asGridCoord(21, 6)]: true,
            [utils.asGridCoord(22, 1)]: true, [utils.asGridCoord(22, 6)]: true,
            [utils.asGridCoord(23, 1)]: true, [utils.asGridCoord(23, 6)]: true,
            
        },
        cutsceneSpaces: {
            [utils.asGridCoord(21, 1)]: [
                {
                    events: [
                        { type: 'changeMap', map: 'Room2', x: utils.withGrid(0), y: utils.withGrid(5) },
                    ]
                }
            ],
            [utils.asGridCoord(20, 2)]: [
                {
                    excludes: ['DEATH_MOVED'],
                    events: [
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "up" },
                        { who: "death", type: "walk", direction: "up" },
                        { who: "death", type: "delete" },
                        { type: 'addStoryFlag', flag: "DEATH_MOVED"}

                    ]
                }
            ],
            [utils.asGridCoord(6, 3)]: [
                {
                    requires: ["JUST_ARRIVED"],
                    events: [
                        { type: 'removeStoryFlag', flag: 'JUST_ARRIVED'},
                        { type: 'letterbox', enable: true },
                        
                        { type: "focus", who: ["death", "hero"] },
                        { type: "zoom", level: 1 },
                        { type: 'wait', duration: 2000 },

                        { who: 'hero', type: "textMessage", text: "Well that was surprisingly easy." },

                        { who: "hero", type: "walk", direction: "right" },
                        { who: "hero", type: "walk", direction: "right" },
                        { who: "hero", type: "walk", direction: "right" },
                        { who: "hero", type: "walk", direction: "right" },
                        { who: "hero", type: "walk", direction: "right" },
                        { who: "hero", type: "walk", direction: "right" },

                        { type: 'wait', duration: 500 },
                        { who: 'hero', type: "textMessage", text: "Hello?", speedMult: 0.7 },


                        { type: 'wait', duration: 1000 },
                        { who: "death", type: "stand", direction: "left" },
                        { type: 'wait', duration: 100 },
                        { who: "hero", type: "backstep", direction: "left" },

                        { type: "textMessage", text: "An apparition of darkness stands before you.", voice: 'narrator' },

                        { who: 'hero', type: "textMessage", text: "Sweet God in heaven!", speedMult: 0.7 },

                        { who: 'npcA', type: "textMessage", text: "..." },
                        { who: 'npcA', type: "textMessage", text: "Intruiging." },
                        

                        { who: 'npcA', type: "textMessage", text: "Greetings, human." },
                        
                        { who: "hero", type: "walk", direction: "right" },
                        { who: 'hero', type: "textMessage", text: "Who... are you?", speedMult: 0.5},

                        { who: 'npcA', type: "textMessage", text: "Ah, a traditional question." },                        
                        { who: "death", type: "walk", direction: "right" },
                        { type: "wait", duration: 1200 },
                        { who: 'npcA', type: "textMessage", text: "I am no one." },

                        { type: "textMessage", text: "You sense a shred of melancholy from the strange entity.", voice: 'narrator' },

                        { who: "hero", type: "walk", direction: "right" },
                        { who: 'hero', type: "textMessage", text: "I beg your pardon?" },

                        { who: "death", type: "stand", direction: "left" },

                        { who: 'npcA', type: "textMessage", text: "I must apologize. That must seem like a frustratingly unhelpful answer." },

                        { who: 'hero', type: "textMessage", text: "It was a bit unhelpful, yeah." },

                        { who: "death", type: "walk", direction: "left" },
                        { who: "death", type: "walk", direction: "left" },
                        { who: 'npcA', type: "textMessage", text: "Allow me to introduce myself." },
                        { who: 'npcA', type: "textMessage", text: "My name is..." },
                        { type: "zoom", level: 4 },
                        { type: "wait", duration: 1000 },
                        { who: 'npcA', type: "textMessage", text: "Death.", voice: "deathEchoDelay" },

                        { who: "hero", type: "backstep", direction: "left" },
                        { type: "zoom", level: 2 },
                        { type: "wait", duration: 1500 },

                        { who: 'hero', type: "textMessage", text: "Oh. Well, that's disconcerting." },

                        { type: "textMessage", text: "You got that right.", voice: 'narrator' },
                        
                        { who: 'death', type: "textMessage", text: "Yeah, I get that a lot." },

                        { who: 'hero', type: "textMessage", text: "So... if you're Death, does that mean I'm... uh..." },
                        
                        { type: "wait", duration: 2000 },
                        { who: "death", type: "walk", direction: "left" },

                        { who: 'death', type: "textMessage", text: "Oh! Oh no no, sorry! You're not dead." },

                        { who: 'hero', type: "textMessage", text: "Whew! I can tell you, that's a massive relief! For a moment I thought for sure I had died!" },

                        { type: "wait", duration: 1000 },
                        { who: 'death', type: "textMessage", text: "Well, actually... you are a little dead. It's complicated." },

                        { who: 'hero', type: "textMessage", text: "Oh my God! I can't believe this! I'm dead! I'm actually dead!" },
                        { who: "hero", type: "walk", direction: "down" },
                        { who: "hero", type: "walk", direction: "right" },
                        { who: "hero", type: "walk", direction: "up" },
                        { who: "hero", type: "walk", direction: "left" },
                        { who: "hero", type: "walk", direction: "up" },
                        { who: "hero", type: "walk", direction: "down" },
                        { who: 'hero', type: "textMessage", text: "Ahhhhhhhhhh!!!", speedMult: 1.3 },

                        { who: 'death', type: "textMessage", text: "Ugh. This is exactly what I was trying to avoid." },                       
                        { who: "death", type: "walk", direction: "left" },
                        { who: 'death', type: "textMessage", text: "Look. Calm down. It's okay. You're okay. Everything's going to be fine. There's no need to panic.", speedMult: 1.25 },
                        
                        { who: "hero", type: "walk", direction: "right" },
                        { who: 'hero', type: "textMessage", text: "Easy for you to say! You're not dead!" },

                        { who: "death", type: "stand", direction: "down" },
                        { who: 'death', type: "textMessage", text: "Actually, as a minor technicality, I too am dead.", speedMult: 1.2 },

                        { who: "hero", type: "stand", direction: "left" },
                        { who: 'hero', type: "textMessage", text: "Oh for crying out loud." },                        
                        { who: "hero", type: "walk", direction: "right" },

                        { who: "death", type: "stand", direction: "left" },
                        { who: 'hero', type: "textMessage", text: "Look, what is this place? Am I in Hell?" },
                        
                        { who: 'death', type: "textMessage", text: "Ah. No. This is not Hell. This is an interstitial boundary domain between the world of the living and the world of the dead. In short, you're in...", speedMult: 1.15 },
                        
                        { type: "zoom", level: 4 },
                        { type: "wait", duration: 1000 },
                        { who: 'death', type: "textMessage", text: "Purgatory.", voice: 'deathEcho', speedMult: 0.33 },
                        { type: "zoom", level: 2 },

                        { who: 'hero', type: "textMessage", text: "That's not very reassuring." },

                        { who: 'death', type: "textMessage", text: "It's not meant to be reassuring." },
                        { who: 'death', type: "textMessage", text: "Why did you think this was Hell anyway? Did you expect to go there?" },

                        { who: "hero", type: "stand", direction: "left" },

                        { type: "textMessage", text: "You feel a sinking feeling deep in your gut, like you somehow just swallowed a fist-sized stone.", voice: 'narrator' },

                        { who: 'hero', type: "textMessage", text: "I..." },

                        { who: "hero", type: "stand", direction: "right" },
                        { who: 'hero', type: "textMessage", text: "I don't know. It looks sinister? It's very ominious... and red?" },

                        { who: 'death', type: "textMessage", text: "Red's just my favourite colour!" },

                        { who: 'hero', type: "textMessage", text: "I didn't mean to knock it. But you have to admit, the decor is a little intimidating." },

                        { who: 'death', type: "textMessage", text: "You do have a point. Sorry about that." },
                        { who: 'death', type: "textMessage", text: "..." },
                        { who: 'death', type: "textMessage", text: "We have spoken long enough. Show me your soul!" },

                        { type: 'dungeon', music: 'dungeon' },

                        { who: 'death', type: "textMessage", text: "Very good. You have surived the labyrinth of my magic." },


                        { who: "death", type: "stand", direction: "down" },
                        { who: "hero", type: "stand", direction: "down" },

                        { who: 'death', type: "textMessage", text: "Oh dear. This appears to be the end of the script. Hopefully it gets completed soon." },
                        { who: 'hero', type: "textMessage", text: "Nah, I'm sure it'll never get finished. I bet you these words will never change." },

                        { type: "textMessage", text: "You lot have no faith in me, do you?", voice: 'narrator' },
                        { who: 'hero', type: "textMessage", text: "Nope! None at all!" },

                        { who: "hero", type: "walk", direction: "left" },
                        { who: "hero", type: "walk", direction: "left" },

                        
                        { who: "hero", type: "stand", direction: "right" },
                        { type: 'letterbox', enable: false },
                        { type: "zoom", level: 1 },
                    ]
                }
            ],
        },
        initialCutscenes: [
            {
                excludes: ["ARRIVED"],
                events: [
                    { type: 'addStoryFlag', flag: 'ARRIVED' },
                    { who: 'hero', type: "stand", direction: "down" },
                    { type: "zoom", level: 4 },
                    { type: 'letterbox', enable: true },
                    { type: 'wait', duration: 2000 },
                    { type: "textMessage", text: "You awaken to a warm stone room with an eerie crimson glow.", voice: 'narrator' },
                    { who: 'hero', type: "textMessage", text: "Where... am... I?" },
                    { type: "textMessage", text: "You don't know?", voice: 'narrator' },
                            
                    { who: 'hero', type: "textMessage", text: "Obviously not! Why do you think I asked!" },
                    { type: "textMessage", text: "Ah, it was a rhetorical question! That would make sense.", voice: 'narrator' },
                    { who: 'hero', type: "textMessage", text: "Wait. Who am I? And why don't I know?" },
                    { type: "textMessage", text: "You have amnesia. I hear it's a very convenient narrative device to avoid explaining anything.", voice: 'narrator' },
                    { who: 'hero', type: "textMessage", text: "Lovely... and who are you?" },
                    { type: "textMessage", text: "A voice only you can hear, saying things you couldn't possibly know.", voice: 'narrator' },
                    { who: 'hero', type: "textMessage", text: "Sure, sure." },
                    { type: "textMessage", text: "I'm also your inner child.", voice: 'narrator' },
                    { who: 'hero', type: "textMessage", text: "Okay then, I'm hearing voices. I must have a head injury." },
                    { type: "textMessage", text: "Yes, you're probably just imagining me. I wouldn't worry about it.", voice: 'narrator' },
                    { who: 'hero', type: "textMessage", text: "Hmmmmm...", speedMult: 0.7 },
        
                    { type: 'wait', duration: 800 },
                    { who: 'hero', type: "stand", direction: "right" },
                    { type: 'wait', duration: 800 },
                    { who: 'hero', type: "stand", direction: "left" },
                    { type: 'wait', duration: 800 },
                    { who: 'hero', type: "stand", direction: "down" },
                    
                    { who: 'hero', type: "textMessage", text: "I need to find someone. Hopefully I'll get some answers." },
                    { who: 'hero', type: "textMessage", text: "Good thing I can use the arrow keys to move." },
                    { type: "textMessage", text: "Don't forget, you can use Enter to interact with things, and if you hold the X key, you can skip cutscenes.", voice: 'narrator' },
                    { who: 'hero', type: "textMessage", text: "Wait, you're telling me I could have skipped over this tutorial?" },
                    { type: "textMessage", text: "Remember, with great power comes great disregard for narrative flow.", voice: 'narrator' },
                    { who: 'hero', type: "textMessage", text: "Okay, I'm going to find someone to advance the story now. Goodbye." },
                    
                    { who: 'hero', type: "walk", direction: "right" },
                    { type: 'letterbox', enable: false },
                    { type: "zoom", level: 1 },
                    { type: 'addStoryFlag', flag: 'JUST_ARRIVED' },
                    { type: 'saveProgress' },
                ]
            }
        ]
    },
    Void: {
        id: 'Void',
        initialCutscenes: [
            {
                events: [
                    { type: 'changeMap', map: 'DeathLand', x: utils.withGrid(21), y: utils.withGrid(1) },
                ]
            }
        ]
    },
    Room2: {
        id: 'Room2',
        music: "crossing-to-the-other-side",
        lowerSrc: "images/maps/room2Lower.png",
        background: "radial-gradient(circle, rgba(50,0,0,1) 0%, rgba(5,0,0,1) 100%);",
            configObjects: {
            flame3: {
                type: 'Flame',
                x: utils.withGrid(6),
                y: utils.withGrid(6),
            },
            hero: {
                type: 'Person',
                x: utils.withGrid(2),
                y: utils.withGrid(3),
                direction: 'right',
                isPlayerControlled: true,
                voice: voices.hero
            },
            death: {
                type: 'Person',
                x: utils.withGrid(5),
                y: utils.withGrid(2),
                voice: voices.death,
                direction: 'down',
                src: "images/characters/people/death.png",
                behaviourLoop: [
                ],
                talking: [
                    {
                        events: [
                            { type: "zoom", level: 3 },
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },
                            { type: 'textMessage', text: "Death stands before you, ominiously existing.", voice: "narrator" },
                            
                            { type: 'textMessage', text: "Yikes, it's very red in here, isn't it?", voice: "hero" },
                            { type: 'textMessage', text: "Definitely. Whoever built this room must have been in quite a rush, hated us, or hated himself." },
                            { type: 'textMessage', text: "How do you know they're a he?", voice: "hero" },
                            { type: 'textMessage', text: "He put the words in my mouth." },
                            { type: 'textMessage', text: "So... what are you doing in here?", voice: "hero" },
                            { type: 'textMessage', text: "I'm ominiously existing. Didn't you listen to your internal monologue that only you can hear (who also happens to be the voice of God, relative to our local existence)?" },
                            { type: 'textMessage', text: "It's more of a dialogue, since I talk back to him. But is there a reason you're in this room all by yourself?", voice: "hero" },
                            { type: 'textMessage', text: "I'm testing the functionality of room transitions!" },
                            { type: 'textMessage', text: "Seems to be working!", voice: "hero" },
                            { type: 'textMessage', text: "Indeed!" },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                ]
            },
            npcA: {
                type: 'Person',
                x: utils.withGrid(10),
                y: utils.withGrid(100),
                voice: voices.monkDude,
                direction: 'left',
                src: "images/characters/people/death.png",
            },
        },
        cutsceneSpaces: {
            [utils.asGridCoord(0, 5)]: [
                {
                    events: [
                        { type: 'changeMap', map: 'DeathLand', x: utils.withGrid(21), y: utils.withGrid(1) },
                    ]
                }
            ],
        },
        initialCutscenes: [
            {
                events: [
                    // { type: 'changeMap', map: 'DeathLand', x: utils.withGrid(21), y: utils.withGrid(1) },
                ]
            }
        ],
        walls: {
            [utils.asGridCoord(0, 1)]: true, [utils.asGridCoord(7, 1)]: true,
            [utils.asGridCoord(0, 2)]: true, [utils.asGridCoord(7, 2)]: true,
            [utils.asGridCoord(0, 3)]: true, [utils.asGridCoord(7, 3)]: true,
            [utils.asGridCoord(0, 4)]: true, [utils.asGridCoord(7, 4)]: true,
            [utils.asGridCoord(7, 5)]: true,
            [utils.asGridCoord(0, 6)]: true, [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(0, 7)]: true, [utils.asGridCoord(7, 7)]: true,

            [utils.asGridCoord(1, 8)]: true, [utils.asGridCoord(1, 0)]: true, 
            [utils.asGridCoord(2, 8)]: true, [utils.asGridCoord(2, 0)]: true,
            [utils.asGridCoord(3, 8)]: true, [utils.asGridCoord(3, 0)]: true, 
            [utils.asGridCoord(4, 8)]: true, [utils.asGridCoord(4, 0)]: true,
            [utils.asGridCoord(5, 8)]: true, [utils.asGridCoord(5, 0)]: true, 
            [utils.asGridCoord(6, 8)]: true, [utils.asGridCoord(6, 0)]: true,
            [utils.asGridCoord(1, 8)]: true, [utils.asGridCoord(1, 0)]: true, 
            [utils.asGridCoord(7, 8)]: true, [utils.asGridCoord(7, 0)]: true,
        },
    }
}