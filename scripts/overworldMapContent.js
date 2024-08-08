window.OverworldMaps = {
    DemoRoom: {
        id: "DemoRoom",
        music: "track-01",
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        configObjects: {
            hero: {
                type: 'Person',
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                isPlayerControlled: true
            },
            npcA: {
                type: 'Person',
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                voice: 'highVoice',
                src: "images/characters/people/npc1.png",
                behaviourLoop: [
                    { type: "stand", direction: "left", time: 800 },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "stand", direction: "right", time: 1200 },
                    { type: "stand", direction: "up", time: 300 },
                ],
                talking: [
                    {
                        required: ["TALKED_TO_ERIO"],
                        events: [
                            { type: 'textMessage', text: "Isn't Erio the coolest?", faceHero: "npcA" }
                        ]
                    },
                    {
                        events: [
                            { type: "textMessage", text: "Ugh... you're so annoying!", faceHero: "npcA" },
                            { type: "textMessage", text: "I'm busy, go away!" },
                            { who: "hero", type: "walk", direction: "left" },
                        ]
                    }
                ]
            },
            npcB: {
                type: 'Person',
                x: utils.withGrid(8),
                y: utils.withGrid(5),
                voice: 'deepVoice',
                src: "images/characters/people/npc2.png",
                behaviourLoop: [
                    { type: 'addStoryFlag', flag: "ERIO_PRESENT" },
                    { type: "stand", direction: "down", time: 5000 },
                    { type: 'removeStoryFlag', flag: "ERIO_PRESENT" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "up" },
                    { type: "stand", direction: "up", time: 5000 },
                    { type: "walk", direction: "left" },
                    { type: "walk", direction: "down" },
                    { type: "walk", direction: "left" },
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "What? You need something?", faceHero: "npcB" },
                            { type: "textMessage", text: "No? Then get lost buddy. I'm very busy thinking hard about what my next words will be. Or something to that effect, I suppose." },
                            { type: 'addStoryFlag', flag: "TALKED_TO_ERIO" }
                        ]
                    }
                ]
                // behaviourLoop: [
                //     { type: "walk", direction: "left" },
                //     { type: "stand", direction: "up", time: 800 },
                //     { type: "walk", direction: "up" },
                //     { type: "walk", direction: "right" },
                //     { type: "walk", direction: "down" },
                // ]
            }
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(1, 3)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7, 4)]: [
                {
                    required: ["ERIO_PRESENT"],
                    events: [
                        { who: "npcB", type: "walk", direction: "left" },
                        { who: "npcB", type: "stand", direction: "up" },
                        { who: "hero", type: "stand", direction: "down", time: 200 },
                        { type: "textMessage", text: "You can't be in there!" },
                        { who: "npcB", type: "walk", direction: "right" },
                        { who: "npcB", type: "stand", direction: "down" },

                        { who: "hero", type: "walk", direction: "down" },
                        { who: "hero", type: "walk", direction: "left" },
                        { who: "hero", type: "walk", direction: "left" }
                    ]
                }
            ],
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Kitchen",
                            x: utils.withGrid(5),
                            y: utils.withGrid(10),
                            direction: "up"
                        },
                    ]
                }
            ],
        }
    },
    Kitchen: {
        id: "Kitchen",
        music: "track-02",
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
                        events: [
                            { type: "textMessage", text: "You made it!", faceHero: "npcB" },
                            { type: "textMessage", text: "Hmmmm... I wonder what to make for lunch?" },
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