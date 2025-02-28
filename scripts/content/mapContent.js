window.OverworldMaps = {

    // MARK: Bridge
    Bridge: {
        id: 'Bridge',
        music: "the-bridge",
        ambience: "reactor-loop-subtle",
        lowerSrc: "images/maps/bridgeLower.png",
        upperSrc: "images/maps/bridgeUpper.png",
        background: "black",
        configObjects: {
            railing1: { type: 'Prop', src: 'railing-down', x: utils.withGrid(4), y: utils.withGrid(7), nonObstructive: true, noBump: true },
            railing2: { type: 'Prop', src: 'railing-down', x: utils.withGrid(5), y: utils.withGrid(7), nonObstructive: true, noBump: true },
            railing3: { type: 'Prop', src: 'railing-down', x: utils.withGrid(6), y: utils.withGrid(7), nonObstructive: true, noBump: true },
            railing4: { type: 'Prop', src: 'railing-down', x: utils.withGrid(7), y: utils.withGrid(7), nonObstructive: true, noBump: true },
            railing5: { type: 'Prop', src: 'railing-down', x: utils.withGrid(8), y: utils.withGrid(7), nonObstructive: true, noBump: true },
            railing6: { type: 'Prop', src: 'railing-down-left', x: utils.withGrid(10), y: utils.withGrid(8), nonObstructive: true, noBump: true },
            railing7: { type: 'Prop', src: 'railing-down-right', x: utils.withGrid(2), y: utils.withGrid(8), nonObstructive: true, noBump: true },
            terminal: {
                type: 'Terminal',
                x: utils.withGrid(5),
                y: utils.withGrid(2),
                nonObstructive: true,
                noBump: true,
                talking: [
                    {
                        requires: ['GOT_ORDERS'],
                        events: [
                            { type: "zoom", level: 2 },
                            { type: 'letterbox', enable: true },
                            { type: 'textMessage', text: 'You head down to the lower decks...', voice: 'narrator' },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                            { type: 'changeMap', map: 'deck2Corridor', x: utils.withGrid(5), y: utils.withGrid(20), direction: 'up' },
                        ]
                    },
                    {
                        events: [
                            { type: "zoom", level: 2 },
                            { type: 'letterbox', enable: true },
                            { type: 'textMessage', text: 'I should talk to the captain before leaving the bridge', voice: 'hero' },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                        ]
                    }
                ]
            },
            flame3: {
                type: 'Flame',
                x: utils.withGrid(6),
                y: utils.withGrid(9),
                talking: [
                    {
                        events: [
                            { type: 'textMessage', text: "This churning bucket of flames seems to have replaced the captain's chair!", voice: "narrator" }
                        ]
                    }
                ]
            },
            hero: {
                type: 'Person',
                x: utils.withGrid(6),
                y: utils.withGrid(6),
                direction: 'down',
                isPlayerControlled: true,
                voice: voices.hero
            },
            captain: {
                type: 'Person',
                x: utils.withGrid(7),
                y: utils.withGrid(10),
                voice: voices.captain,
                direction: 'down',
                src: "images/characters/people/captain.png",
                behaviourLoop: [
                ],
                talking: [
                    {
                        requires: ['NO_PATIENCE_2'],
                        events: [
                            { type: 'textMessage', text: "The captain looks far too irritated with you, best start actually following your orders if you want to keep your stripes.", voice: "narrator" }
                        ]
                    },
                    {
                        requires: ['NO_PATIENCE'],
                        events: [
                            { type: "zoom", level: 2 },
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },

                            { type: 'textMessage', text: "...", faceHero: "captain" },
                            { type: 'textMessage', text: "Uhhhh... Where's Engineering? Sir?", voice: "hero" },
                            { type: 'textMessage', text: "You're kidding me." },
                            { type: 'textMessage', text: "Take the elevator, go down the central corridor, to the reactor room. Can't miss it. Now go before I demote you on the spot!" },
                            { type: 'textMessage', text: "Right away, captain.", voice: "hero" },
                            { type: 'textMessage', text: "You feel sweat drip down your neck. The captain will remember this...", voice: "narrator" },

                            { who: "captain", type: "stand", direction: "down" },
                            { type: 'addStoryFlag', flag: 'NO_PATIENCE_2' },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                    {
                        requires: ['GOT_ORDERS'],
                        events: [
                            { type: "zoom", level: 2 },
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },

                            { type: 'textMessage', text: "I thought I gave you an order lieutenant.", faceHero: "captain" },
                            { type: 'textMessage', text: "You did sir.", voice: "hero" },
                            { type: 'textMessage', text: "Evidently not because you're still here." },
                            { type: 'textMessage', text: "Sorry sir, I'm just so excited to be here!", voice: "hero" },
                            { type: 'textMessage', text: "Can you be excited AND do your job?" },
                            { type: 'textMessage', text: "Yes sir!", voice: "hero" },
                            { type: 'textMessage', text: "Then get on with it!" },

                            { who: "captain", type: "stand", direction: "down" },
                            { type: 'addStoryFlag', flag: 'NO_PATIENCE' },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                    {
                        events: [
                            { type: "zoom", level: 2 },
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },
                            { type: 'textMessage', text: "The captain stands attentively on the bridge, waiting for any sign of activity.", voice: "narrator" },

                            { type: 'textMessage', text: "Sir!", voice: "hero" },
                            { type: 'textMessage', text: "Yes... [rank]? What's you're name?", faceHero: "captain" },
                            { type: 'textMessage', text: "[Name] sir.", voice: "hero" },
                            { type: 'textMessage', text: "[Rank] [Name]. Well, is there something you need?"},
                            { type: 'textMessage', text: "No sir. Is there anything you need?", voice: "hero" },
                            { type: 'textMessage', text: "A cup of coffee." },
                            { type: 'textMessage', text: "Aren't we out of coffee?", voice: "hero" },
                            { type: 'textMessage', text: "Yes, we are lieutenant. We most certainly are." },
                            { type: 'textMessage', text: "Sorry to have reminded you, captain.", voice: "hero" },
                            { type: 'textMessage', text: "Hmmm... go talk to Lieutenant Commander Carlyle in Engineering. He's been working on a secret coffee-related project. Give him a hand. It's top priority." },
                            { who: 'hero', type: "jump" },
                            { type: 'textMessage', text: "Roger that! Right away captain!", voice: "hero" },
                            { who: "captain", type: "stand", direction: "down" },
                            { type: 'textMessage', text: "Soon... soon I shall once again be caffinated... and then nothing will stop me..." },
                            { type: 'wait', duration: 1000 },
                            { type: 'textMessage', text: "... from sleeping. Obviously.", faceHero: 'captain' },
                            
                            { who: "captain", type: "stand", direction: "down" },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                            { type: 'addStoryFlag', flag: 'GOT_ORDERS' },
                            { type: 'saveProgress' },
                        ]
                    },
                ]
            },
        },
        cutsceneSpaces: {
            [utils.asGridCoord(0, 5)]: [
                {
                    events: [
                        { type: 'changeMap', map: 'DeathLand', x: utils.withGrid(22), y: utils.withGrid(2) },
                    ]
                }
            ],
        },
        initialCutscenes:
        [
            {
                excludes: ["ARRIVED"],
                events: [
                    { type: 'addStoryFlag', flag: 'ARRIVED' },
                    { who: 'hero', type: "stand", direction: "down" },
                    { type: "zoom", level: 2 },
                    { type: 'letterbox', enable: true },
                    { type: 'wait', duration: 2000 },

                    // { who: 'hero', type: "textMessage", text: "[they] [they're] [they'll] [they'd] [them] [their] [their's]. [They] [They're] [They'll] [They'd] [Them] [Their] [Their's]. [THEY] [THEY'RE] [THEY'LL] [THEY'D] [THEM] [THEIR] [THEIR'S]." },

                    { type: "textMessage", text: "You step out of the elevator onto the thrumbing deck plating of the bridge. The sound of computer terminals and crew chatter fills the air.", voice: 'narrator' },
                    { type: "textMessage", text: "You're aboard the Coalition Star Ship Ganymede, a fresh transfer from the academy on Rigel V. You've got a lot to prove if you want to make it here...", voice: 'narrator' },

                    { who: 'hero', type: "walk", direction: "down" },
                    { who: 'hero', type: "textMessage", text: "I should talk to the captain, show some initiative!" },
                    
                    { type: 'letterbox', enable: false },
                    { type: "zoom", level: 1 },
                    { type: 'addStoryFlag', flag: 'JUST_ARRIVED' },
                    { type: 'saveProgress' },
                    { type: 'roomTitle', text: 'Deck 1: Bridge'}
                ]
            },
            {
                events: [
                    { type: "zoom", level: 1 },
                    { type: 'saveProgress' },
                    { type: 'roomTitle', text: 'Deck 1: Bridge' }
                ]
            }
        ],
        walls: {
            [utils.asGridCoord(5, 2)]: true, [utils.asGridCoord(6, 2)]: true, [utils.asGridCoord(7, 2)]: true,
            [utils.asGridCoord(4, 3)]: true, [utils.asGridCoord(8, 3)]: true,
            [utils.asGridCoord(4, 4)]: true, [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(5, 5)]: true, [utils.asGridCoord(7, 5)]: true,
            [utils.asGridCoord(4, 5)]: true, [utils.asGridCoord(8, 5)]: true, [utils.asGridCoord(3, 5)]: true, [utils.asGridCoord(9, 5)]: true,
            [utils.asGridCoord(2, 6)]: true, [utils.asGridCoord(10, 6)]: true,
            [utils.asGridCoord(1, 7)]: true, [utils.asGridCoord(11, 7)]: true,
            [utils.asGridCoord(1, 8)]: true, [utils.asGridCoord(11, 8)]: true,
            [utils.asGridCoord(2, 9)]: true, [utils.asGridCoord(10, 9)]: true, [utils.asGridCoord(4, 8)]: true, [utils.asGridCoord(8, 8)]: true, [utils.asGridCoord(5, 8)]: true, [utils.asGridCoord(7, 8)]: true, [utils.asGridCoord(6, 8)]: true,
        },
    },





    // MARK: Deck 2 Corridor
    deck2Corridor: {
        id: 'deck2Corridor',
        // music: "engineering",
        ambience: "reactor-loop",
        upperSrc: "images/maps/deck2-Upper.png",
        lowerSrc: "images/maps/deck2-Lower.png",
        background: "black",
        configObjects: {
            hero: {
                type: 'Person',
                x: utils.withGrid(5),
                y: utils.withGrid(20),
                direction: 'up',
                isPlayerControlled: true,
                voice: voices.hero
            },
            terminal: {
                type: 'Terminal',
                x: utils.withGrid(5),
                y: utils.withGrid(19),
                noBump: true,
                talking: [
                    {
                        requires: ['GOT_ORDERS'],
                        events: [
                            { type: "zoom", level: 2 },
                            { type: 'letterbox', enable: true },
                            { type: 'textMessage', text: 'You make your way up to the bridge.', voice: 'narrator' },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                            { type: 'changeMap', map: 'Bridge', x: utils.withGrid(5), y: utils.withGrid(3), direction: 'up' },                            
                        ]
                    }
                ]
            },
            accessPanel: {
                type: 'Prop',
                src: null,
                x: utils.withGrid(7),
                y: utils.withGrid(12),
                talking: [
                    {
                        events: [
                            { type: 'textMessage', text: "Better not mess with those wires. I'm no engineer.", voice: "hero" }
                        ]
                    }
                ]
            },
            reactor: {
                type: 'Prop',
                src: null,
                x: utils.withGrid(6),
                y: utils.withGrid(5),
                talking: [
                    {
                        excludes: ['REACTOR'],
                        events: [
                            { type: "textMessage", text: "The room is bathed in a golden yellow light. Energy pulses and coils inside the device before you - the beating heart of the CSS Ganymede.", voice: 'narrator' },
                            { type: 'textMessage', text: "The deuterium reactor! It's bigger than I thought it would be.", voice: "hero" },
                            { type: 'addStoryFlag', flag: 'REACTOR' },
                        ]
                    },
                    {
                        events: [
                            { type: 'textMessage', text: "This thing's no less awesome than it was before.", who: 'hero' },
                        ]
                    },
                ]
            },
        },
        cutsceneSpaces: {
            [utils.asGridCoord(3, 1)]: [
                {
                    events: [
                        { type: 'textMessage', text: "Crap! I can't go in there, it's the end of the demo!", who: 'hero' },
                        { who: 'hero', type: "walk", direction: "down" },
                    ]
                }
            ],
            [utils.asGridCoord(6, 15)]: [
                {
                    excludes: ['ACCESS_PANEL'],
                    events: [
                        { type: 'textMessage', text: 'Huh. That access panel is open. Someone must be working around here.', who: 'hero' },
                        { type: 'addStoryFlag', flag: 'ACCESS_PANEL' },
                    ]
                }
            ],
        },
        initialCutscenes: [
            {
                excludes: ['ENTERED_ENGINEERING'],
                events: [
                    { type: "zoom", level: 2 },
                    { type: 'letterbox', enable: true },
                    { type: 'wait', duration: 2000 },

                    { type: 'roomTitle', text: 'Deck 2: Engineering' },

                    { type: "textMessage", text: "The elevator locks into place on Deck 2. A warm hum eminates from the reactor room.", voice: 'narrator' },

                    { who: 'hero', type: "walk", direction: "right" },
                    { who: 'hero', type: "walk", direction: "up" },
                    { who: 'hero', type: "textMessage", text: "Time to find Commander Carlylse." },

                    { type: 'letterbox', enable: false },
                    { type: "zoom", level: 1 },
                    { type: 'saveProgress' },
                    { type: 'addStoryFlag', flag: 'ENTERED_ENGINEERING' },
                ]
            },
            {
                events: [
                    { type: 'roomTitle', text: 'Deck 2: Engineering' },
                ]
            }
        ],
        walls: {
            [utils.asGridCoord(5, 19)]: true, [utils.asGridCoord(7, 19)]: true,
            [utils.asGridCoord(4, 20)]: true, [utils.asGridCoord(8, 20)]: true,
            [utils.asGridCoord(4, 21)]: true, [utils.asGridCoord(8, 21)]: true,
            [utils.asGridCoord(5, 22)]: true, [utils.asGridCoord(6, 22)]: true, [utils.asGridCoord(7, 22)]: true,
        },
    },















    DeathLand: {
        id: "DeathLand",
        music: "crossing-to-the-other-side",
        lowerSrc: "images/maps/DeathLandLower.png",
        upperSrc: "images/maps/DeathLandUpper.png",
        background: "radial-gradient(circle, rgba(50,0,0,1) 0%, rgba(5,0,0,1) 100%);",
        configObjects: {
            signpost: {
                type: 'Signpost',
                x: utils.withGrid(23),
                y: utils.withGrid(3),
                talking: [
                    {
                        events: [
                            {type: 'textMessage', text: '"This door leads to the next room, as is the traditional structure of physical space."', voice: 'info'}
                        ]
                    }
                ]
            },
            flame: {
                type: 'Flame',
                x: utils.withGrid(6),
                y: utils.withGrid(3),
            },
            flame2: {
                type: 'Flame',
                x: utils.withGrid(6),
                y: utils.withGrid(5),
            },
            flame3: {
                type: 'Flame',
                x: utils.withGrid(6),
                y: utils.withGrid(6),
                talking: [
                    {
                        events: [        
                            { type: "zoom", level: 3 },
                            { type: 'wait', duration: 1000},
                            { who: 'hero', type: "jump" },
                            { type: 'textMessage', text: "Ow! That's really hot!", who:'hero' },
                            { type: 'textMessage', text: "The pain of the fire has given you newfound strength!", voice:'narrator' },
                            { type: 'increaseHealth', amount: 2 },
                            { type: "zoom", level: 1 },
                        ]
                    }
                ]
            },
            battleFlame: {
                type: 'Flame',
                x: utils.withGrid(1),
                y: utils.withGrid(6),
                talking: [
                    {
                        events: [
                            { type: 'textMessage', text: "I am the narrator, and your *closest friend*.", voice: "narrator" },
                            { type: 'textMessage', text: "I have no idea who I am. I need *answers*.", voice: "hero" },
                            { type: 'textMessage', text: "I am Death. I'm not as bad as I sound, *I swear*.", voice: "death" },
                            { type: 'textMessage', text: "Child of the *Living Realm*, know that I am Inferno's Warden.", voice: "devil" },
                            { type: 'textMessage', text: "Vigilant of *Harmony* am I. Guided are you by a song.", voice: "vigilant" },
                            { type: 'textMessage', text: "You stand before the King of *The Other Side*.", voice: "king" },
                            { type: 'textMessage', text: "I am a *lost soul*... please save me!", voice: "lostSoul" },
                            { type: 'textMessage', text: "Here is some *information*.", voice: "info" },
                            { type: 'textMessage', text: "WORTHLESS INSECT! I will devour your *SOUL*! COWER and TREMBLE!", voice: "demon" },
                            { type: 'dungeon', levels: 2}
                        ]
                    }
                ]
            },
            hero: {
                type: 'Person',
                x: utils.withGrid(3),
                y: utils.withGrid(4),
                direction: 'right',
                isPlayerControlled: true,
                voice: voices.hero
            },
            lostSoul: {
                type: 'Person',
                x: utils.withGrid(11),
                y: utils.withGrid(6),
                voice: voices.lostSoul,
                direction: 'down',
                src: "images/characters/people/lostSoul.png",
                excludes: ["JIM_SAVED"],
                behaviourLoop: [
                    { type: 'wait', duration: 2000 },
                    { type: 'walk', direction: 'left' },
                    { type: 'walk', direction: 'left' },
                    { type: 'walk', direction: 'left' },
                            
                    { type: 'wait', duration: 2000 },
                    { type: 'walk', direction: 'right' },
                    { type: 'walk', direction: 'right' },
                    { type: 'walk', direction: 'right' },
                            
                ],
                talking: [
                    {
                        events: [
                            { type: "zoom", level: 2 },
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },
                            { type: 'textMessage', text: "This lost soul drifts in the air. They smell of pain and suffering.", voice: "narrator" },
                            { type: 'textMessage', text: "Help... me..." },
                            { type: 'textMessage', text: "I'll do what I can.", voice: "hero" },

                            { type: 'dungeon', music: 'dungeon' },
                            { type: 'addStoryFlag', flag: 'JIM_SAVED'},

                            { type: 'textMessage', text: "Free... at... last. Thank... you..."},
                            { type: 'delete', who: 'lostSoul'},
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                ]
            },
            death: {
                type: 'Person',
                x: utils.withGrid(20),
                y: utils.withGrid(4),
                voice: voices.death,
                direction: 'up',
                src: "images/characters/people/death.png",
                excludes: ["DEATH_MOVED"],
                behaviourLoop: [
                ],
                talking: [
                    {
                        events: [
                            { type: "zoom", level: 2 },
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
            king: {
                type: 'Person',
                x: utils.withGrid(24),
                y: utils.withGrid(5),
                voice: voices.king,
                direction: 'down',
                src: "images/characters/people/king.png",
                talking: [
                    {
                        events: [
                            { type: "zoom", level: 2 },
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },
                            { type: 'textMessage', text: "The King of The Other Side is an imposing figure. His eyes pierce through your soul.", voice: "narrator" },
                            
                            { type: 'textMessage', text: "Speak.", faceHero: "king" },

                            { type: 'textMessage', text: "Um... are you in charge here?", voice: "hero" },
                            { type: 'textMessage', text: "Yes." },

                            { type: 'textMessage', text: "Can I do anything to help?", voice: "hero" },
                            { type: 'textMessage', text: "No." },

                            { type: 'textMessage', text: "You don't talk much, do you?", voice: "hero" },
                            { type: 'textMessage', text: "I talk a great deal, but not to people who have yet to prove their significance to the realm." },
                            { type: 'textMessage', text: "Souls like you come and go like dust on the wind. Many claim they will achieve a great deal. Few do." },

                            { type: 'textMessage', text: "That's fair. I suppose you get a lot of people trying to get favours or help.", voice: "hero" },
                            { type: 'textMessage', text: "Precisely. Come back when you have done something for this realm. Then this realm might do something for you." },

                            { type: 'textMessage', text: "The King looks at you wistfully. It's clear he doesn't expect you to succeed. He's too jaded to see the spark in your eyes.", voice: "narrator" },
                            { type: "zoom", level: 1 },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                ]
            },
            devil: {
                type: 'Person',
                x: utils.withGrid(9),
                y: utils.withGrid(3),
                voice: voices.devil,
                direction: 'down',
                src: "images/characters/people/devil.png",
                talking: [
                    {
                        requires: ['MET_FLAMES_AGAIN'],
                        events: [
                            { type: "zoom", level: 2 },
                            { type: "focus", who: ['hero', 'devil'] },
                            
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },
                            
                            { type: 'textMessage', text: "Yo.", voice: "hero" },
                            { type: 'textMessage', text: "Yo.", faceHero: "devil"},

                            { type: 'textMessage', text: "Time passes, as you and One Thousand Flames enjoy a moment of shared respect.", voice: 'narrator' },

                            { type: "zoom", level: 1 },
                            { type: "focus", who: 'hero' },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                    {
                        requires: ['MET_FLAMES'],
                        events: [
                            { type: "zoom", level: 2 },
                            { type: "focus", who: ['hero', 'devil'] },
                            
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },
                            
                            { type: 'textMessage', text: "What do you do around here?", voice: "hero" },
                            { type: 'textMessage', text: "I am Inferno's Warden.", faceHero: "devil"},

                            { type: 'textMessage', text: "What the heck is that?", voice: "hero" },
                            { type: 'textMessage', text: "Inferno? The domain of the Soulless, the Unruly, and the Cruel. All who seek to cause others harm eventually find themselves there."},

                            { type: 'textMessage', text: "That sounds intense. You get paid well for that?", voice: "hero" },
                            { type: 'textMessage', text: "An amusing notion. I do not."},

                            { type: 'textMessage', text: "Then why do it?", voice: "hero" },
                            { type: 'textMessage', text: "It is my duty. If I do not do it, then who will? Few others have the fortitude."},

                            { type: 'textMessage', text: "But do you HAVE to do it?", voice: "hero" },

                            { type: 'textMessage', text: "The fiery soul releases a great heaving sigh, a sound like a mighty tree being felled.", voice: "narrator" },
                            
                            { type: 'textMessage', text: "If I could abdicate my role, I would not be willing to do so. It suits me. I am like them."},
                            { type: 'textMessage', text: "Like who?", voice: "hero" },

                            { type: 'textMessage', text: "The Soulless. The Unruly. The Cruel."},
                            { type: 'textMessage', text: "How are you like them?", voice: "hero" },

                            { type: 'textMessage', text: "..."},
                            { type: 'textMessage', text: "You ask many questions. More than I have the will to answer."},
                            { type: 'textMessage', text: "I'm sorry. I'm just curious.", voice: "hero" },

                            { type: 'textMessage', text: "It was not a criticism. I respect you for it. But I am not an open book. Even if I wish to be."},
                            { type: 'textMessage', text: "I'll leave you to your thoughts then.", voice: "hero" },

                            { type: 'textMessage', text: "I appreciate that."},

                            { type: "removeStoryFlag", flag: 'MET_FLAMES' },
                            { type: "addStoryFlag", flag: 'MET_FLAMES_AGAIN' },

                            { type: "zoom", level: 1 },
                            { type: "focus", who: 'hero' },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                    
                    {
                        events: [
                            { type: "zoom", level: 2 },
                            { type: "focus", who: ['hero', 'devil'] },
                            
                            { type: 'letterbox', enable: true },
                            { type: 'wait', duration: 500 },
                            { type: 'textMessage', text: "The heat radiating from this spirit is immense.", voice: "narrator" },
                            
                            { type: 'textMessage', text: "Hello there!", voice: "hero" },

                            { type: 'textMessage', text: "...", faceHero: "devil", voice: "devilUnknown" },

                            { type: 'textMessage', text: "Okay, not a big talker. I get it. Can you tell me what your name is?", voice: "hero" },

                            { type: 'textMessage', text: "...", voice: "devilUnknown" },

                            { type: 'textMessage', text: "Right. I guess I'll just leave you to it.", voice: "hero" },

                            { type: 'textMessage', text: "One Thousand Flames.", voice: "devilUnknown" },

                            { type: 'textMessage', text: "Excuse me?", voice: "hero" },

                            { type: 'textMessage', text: "You asked me what my name was.", voice: "devilUnknown" },
                            { type: 'textMessage', text: "Your name is One Thousand Flames?", voice: "hero" },


                            { type: 'textMessage', text: "Yes." },
                            { type: 'textMessage', text: "Wow. That's... honestly a really cool name.", voice: "hero" },


                            { type: 'textMessage', text: "It was inflicted upon me by the Tribune of Ash, as punishment for my crimes." },
                            { type: 'textMessage', text: "Crimes? What crimes?", voice: "hero" },

                            { type: 'textMessage', text: "It is not my place to speak of them. I regret them to this day, and live with the consequences resting upon my conscience." },
                            { type: 'textMessage', text: "What was your name before you were given this name?", voice: "hero" },

                            { type: 'textMessage', text: "It was taken from me." },
                            { type: 'textMessage', text: "So you can't speak your own name?", voice: "hero" },

                            { type: 'textMessage', text: "I cannot remember it. As I said, it was taken." },
                            { type: 'textMessage', text: "You broke some rules, and all they did was change your name?", voice: "hero" },

                            { type: 'textMessage', text: "Yes." },
                            { type: 'textMessage', text: "Huh. I know losing your name must have hurt, but was it really that bad?", voice: "hero" },

                            { type: 'textMessage', text: "My old name was way more awesome." },
                            { type: 'textMessage', text: "Oh...", voice: "hero" },


                            { type: 'textMessage', text: "You're too stunned by this revelation to continue the conversation. Even his replacement name is cooler than yours.", voice: "narrator" },
                            
                            { type: "addStoryFlag", flag: 'MET_FLAMES' },
                            
                            { type: "zoom", level: 1 },
                            { type: "focus", who: 'hero' },
                            { type: 'letterbox', enable: false },
                        ]
                    },
                ]
            },
            npcA: {
                type: 'Person',
                x: utils.withGrid(11),
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
            [utils.asGridCoord(0, 3)]: true, [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(0, 5)]: true, [utils.asGridCoord(0, 6)]: true,

            [utils.asGridCoord(25, 3)]: true, [utils.asGridCoord(25, 4)]: true,
            [utils.asGridCoord(25, 5)]: true, [utils.asGridCoord(25, 6)]: true,

            
            [utils.asGridCoord(1, 2)]: true, [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(2, 2)]: true, [utils.asGridCoord(2, 7)]: true,
            [utils.asGridCoord(3, 2)]: true, [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(4, 2)]: true, [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(5, 2)]: true, [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(6, 2)]: true, [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(7, 2)]: true, [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 2)]: true, [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(9, 2)]: true, [utils.asGridCoord(9, 7)]: true,
            [utils.asGridCoord(10, 2)]: true, [utils.asGridCoord(10, 7)]: true,
            [utils.asGridCoord(11, 2)]: true, [utils.asGridCoord(11, 7)]: true,
            [utils.asGridCoord(12, 2)]: true, [utils.asGridCoord(12, 7)]: true,
            [utils.asGridCoord(13, 2)]: true, [utils.asGridCoord(13, 7)]: true,
            [utils.asGridCoord(14, 2)]: true, [utils.asGridCoord(14, 7)]: true,
            [utils.asGridCoord(15, 2)]: true, [utils.asGridCoord(15, 7)]: true,
            [utils.asGridCoord(16, 2)]: true, [utils.asGridCoord(16, 7)]: true,
            [utils.asGridCoord(17, 2)]: true, [utils.asGridCoord(17, 7)]: true,
            [utils.asGridCoord(18, 2)]: true, [utils.asGridCoord(18, 7)]: true,
            [utils.asGridCoord(19, 2)]: true, [utils.asGridCoord(19, 7)]: true,
            [utils.asGridCoord(20, 2)]: true, [utils.asGridCoord(20, 7)]: true,
            [utils.asGridCoord(21, 2)]: true, [utils.asGridCoord(21, 7)]: true,
            [utils.asGridCoord(22, 1)]: true, [utils.asGridCoord(22, 7)]: true,
            [utils.asGridCoord(23, 2)]: true, [utils.asGridCoord(23, 7)]: true,
            [utils.asGridCoord(24, 2)]: true, [utils.asGridCoord(24, 7)]: true,
            
        },
        cutsceneSpaces: {
            [utils.asGridCoord(22, 2)]: [
                {
                    events: [
                        { type: 'changeMap', map: 'Room2', x: utils.withGrid(0), y: utils.withGrid(5), direction: 'right' },
                    ]
                }
            ],
            [utils.asGridCoord(21, 3)]: [
                {
                    excludes: ['DEATH_MOVED'],
                    events: [
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "right" },
                        { who: "death", type: "walk", direction: "up" },
                        { who: "death", type: "stand", direction: "left" },
                        { who: "hero", type: "stand", direction: "right" },
                        { who: 'death', type: "textMessage", text: "I'll see you in a bit!" },
                        { who: "death", type: "walk", direction: "up" },
                        { who: "death", type: "delete" },
                        { type: 'addStoryFlag', flag: "DEATH_MOVED"}

                    ]
                }
            ],
            [utils.asGridCoord(7, 4)]: [
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
                        { type: "zoom", level: 3 },
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
                        { who: 'death', type: "textMessage", text: "The Other Side.", voice: 'deathEcho', speedMult: 0.33 },
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



                        { who: "death", type: "stand", direction: "down" },
                        { who: "hero", type: "stand", direction: "down" },

                        { who: 'death', type: "textMessage", text: "Oh dear. This appears to be the end of the script. Hopefully it gets completed soon." },
                        { who: 'hero', type: "textMessage", text: "Nah, I'm sure it'll never get finished. I bet you these words will never change." },

                        { type: "textMessage", text: "You lot have no faith in me, do you?", voice: 'narrator' },
                        { who: 'hero', type: "textMessage", text: "Nope! None at all!" },

                        { who: "hero", type: "stand", direction: "right" },
                        { type: "focus", who: "hero" },

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
                    { type: "zoom", level: 2 },
                    { type: 'letterbox', enable: true },
                    { type: 'wait', duration: 2000 },

                    // { who: 'hero', type: "textMessage", text: "[they] [they're] [they'll] [they'd] [them] [their] [their's]. [They] [They're] [They'll] [They'd] [Them] [Their] [Their's]. [THEY] [THEY'RE] [THEY'LL] [THEY'D] [THEM] [THEIR] [THEIR'S]." },

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
                    { type: 'changeMap', map: 'DeathLand', x: utils.withGrid(22), y: utils.withGrid(2) },
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
                            { type: "zoom", level: 2 },
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
                        { type: 'changeMap', map: 'DeathLand', x: utils.withGrid(22), y: utils.withGrid(2) },
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
            [utils.asGridCoord(-1, 5)]: true, [utils.asGridCoord(7, 5)]: true,
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