"use strict";

const characters = {
    bow: [
        "aloy",
        "amber",
        "collei",
        "diona",
        "faruzan",
        "fischl",
        "ganyu",
        "gorou",
        "sara",
        "lyney",
        "tartaglia",
        "tighnari",
        "venti",
        "yelan",
        "yoimiya",
    ],
    catalyst: [
        "baizhu",
        "barbara",
        "charlotte",
        "klee",
        "lisa",
        "mona",
        "nahida",
        "neuvillette",
        "ningguang",
        "kokomi",
        "heizou",
        "sucrose",
        "wriothesley",
        "wanderer",
        "xianyun",
        "yae_miko",
        "yanfei",
    ],
    claymore: [
        "arataki_itto",
        "beidou",
        "chongyun",
        "dehya",
        "diluc",
        "dori",
        "eula",
        "freminet",
        "gaming",
        "kaveh",
        "navia",
        "noelle",
        "razor",
        "sayu",
        "xinyan",
    ],
    polearm: [
        "candace",
        "cyno",
        "hu_tao",
        "mika",
        "raiden",
        "rosaria",
        "shenhe",
        "thoma",
        "xiangling",
        "xiao",
        "yaoyao",
        "yun_jin",
        "zhongli",
    ],
    sword: [
        "albedo",
        "alhaitham",
        "bennet",
        "chiori",
        "furina",
        "jean",
        "kazuha",
        "kaeya",
        "ayaka",
        "ayato",
        "keqing",
        "kirara",
        "kuki",
        "layla",
        "lynette",
        "nilou",
        "qiqi",
        "traveler",
        "xingqiu",
    ],
};

const artifactType = {
    sands: [
        "HP%",
        "HP",
        "ATK%",
        "ATK",
        "DEF%",
        "DEF",
        "Elemental Mastery",
        "Energy Recharge%",
    ],
    flower: ["HP"],
    goblet: [
        "Pyro DMG",
        "Cryo DMG",
        "Electro DMG",
        "Dendro DMG",
        "Geo DMG",
        "Hydro DMG",
        "Anemo DMG",
        "Physical DMG",
        "ATK%",
        "HP%",
        "DEF%",
        "Elemental Mastery",
    ],
    plume: ["ATK"],
    circlet: [
        "Crit Rate",
        "Crit DMG",
        "DEF%",
        "ATK%",
        "Healing Bonus",
        "Elemental Mastery",
    ],
};

const artifactRarity = {
    max_rarity3: [1, 2, 3],
    max_rarity4: [3, 4],
    max_rarity5: [4, 5],
};

const artifactTypeWithoutCirclet = ["sands", "flower", "goblet", "plume"];
const blockedSets = [
    "prayers-for-wisdom",
    "prayers-for-destiny",
    "prayers-for-illumination",
    "prayers-to-springtime",
];

// as of 07 feb 2024 no more characters were added to the full release of the game

const fetchArtifacts = fetch(`https://genshin.jmp.blue/artifacts/all`)
    .then((result) => result.json())
    .then((artifactList) => {
        function randomizeArtifact(whichArtifact, artifactPiece) {
            function randomizeArtifactRarity(set) {
                const maxRarityOfArtifact = set.max_rarity;
                switch (maxRarityOfArtifact) {
                    case 3:
                        return artifactRarity.max_rarity3[
                            Math.floor(
                                Math.random() *
                                    artifactRarity.max_rarity3.length
                            )
                        ];
                    case 4:
                        return artifactRarity.max_rarity4[
                            Math.floor(
                                Math.random() *
                                    artifactRarity.max_rarity4.length
                            )
                        ];
                    case 5:
                        return artifactRarity.max_rarity5[
                            Math.floor(
                                Math.random() *
                                    artifactRarity.max_rarity5.length
                            )
                        ];
                }
                // return rarityList[
                //     Math.floor(Math.random() * rarityList.length)
                // ];
            }
            let generatedMainStat = Math.floor(
                Math.random() * whichArtifact.length
            );
            let generatedArtifactSet = Math.floor(
                Math.random() * artifactList.length
            );

            if (artifactTypeWithoutCirclet.includes(artifactPiece)) {
                if (blockedSets.includes(artifactList[generatedArtifactSet])) {
                    let ifIncludes = blockedSets.includes(
                        artifactList[generatedArtifactSet]
                    );
                    while (ifIncludes) {
                        generatedArtifactSet = Math.floor(
                            Math.random() * artifactList.length
                        );
                        ifIncludes = blockedSets.includes(
                            artifactList[generatedArtifactSet]
                        );
                    }
                    return {
                        mainStat: whichArtifact[generatedMainStat],
                        artifactSet: artifactList[generatedArtifactSet].name,
                        artifactRarity: randomizeArtifactRarity(
                            artifactList[generatedArtifactSet]
                        ),
                    };
                }
                return {
                    mainStat: whichArtifact[generatedMainStat],
                    artifactSet: artifactList[generatedArtifactSet].name,
                    artifactRarity: randomizeArtifactRarity(
                        artifactList[generatedArtifactSet]
                    ),
                };
            } else {
                return {
                    mainStat: whichArtifact[generatedMainStat],
                    artifactSet: artifactList[generatedArtifactSet].name,
                    artifactRarity: randomizeArtifactRarity(
                        artifactList[generatedArtifactSet]
                    ),
                };
            }
        }
        const characterArtifacts = {
            goblet: randomizeArtifact(artifactType.goblet, "goblet"),
            plume: randomizeArtifact(artifactType.plume, "plume"),
            circlet: randomizeArtifact(artifactType.circlet, "circlet"),
            flower: randomizeArtifact(artifactType.flower, "flower"),
            sands: randomizeArtifact(artifactType.sands, "sands"),
        };
        console.log(characterArtifacts);
    });

// function generateBuild() {
//     let gobletStat = randomizeArtifact(artifactType.goblet);
//     let plumeStat = randomizeArtifact(artifactType.plume);
//     let circletStat = randomizeArtifact(artifactType.circlet);
//     let flowerStat = randomizeArtifact(artifactType.flower);
//     let sandsStat = randomizeArtifact(artifactType.sands);
//     console.log(gobletStat, plumeStat, circletStat, flowerStat, sandsStat);
// }

// generateBuild();

// console.log(Object.keys(artifactSets).length, Object.keys(artifactSets)[1]);
