window.OverworldMaps = {
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
                            { type: 'textMessage', text: "I am the narrator, and your closest friend.", voice: "narrator" },
                            { type: 'textMessage', text: "I have no idea who I am. I need answers", voice: "hero" },
                            { type: 'textMessage', text: "I am Death. I'm not as bad as I sound, I swear.", voice: "death" },
                            { type: 'textMessage', text: "Child of the Living Realm, know that I am Inferno's Warden.", voice: "devil" },
                            { type: 'textMessage', text: "Vigilant of Harmony am I. Guided are you by a song.", voice: "vigilant" },
                            { type: 'textMessage', text: "You stand before the King of The Other Side.", voice: "king" },
                            { type: 'textMessage', text: "I am a lost soul... please save me!", voice: "lostSoul" },
                            { type: 'textMessage', text: "Here is some information.", voice: "info" },
                            { type: 'textMessage', text: "WORTHLESS INSECT! I will devour your SOUL! COWER and TREMBLE!", voice: "demon" },
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