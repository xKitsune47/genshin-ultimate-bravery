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
        "hp%",
        "hp",
        "atk%",
        "atk",
        "def%",
        "def",
        "elemental mastery",
        "energy recharge%",
    ],
    flower: ["hp"],
    goblet: [
        "pyro dmg",
        "cryo dmg",
        "electro dmg",
        "dendro dmg",
        "geo dmg",
        "hydro dmg",
        "anemo dmg",
        "physical dmg",
        "atk%",
        "hp%",
        "def%",
        "elemental mastery",
    ],
    plume: ["atk"],
    circlet: [
        "crit rate",
        "crit dmg",
        "def%",
        "atk%",
        "healing bonus",
        "elemental mastery",
    ],
};

const artifactTypeWithoutCirclet = ["sands", "flower", "goblet", "plume"];
const blockedSets = [
    "prayers-for-wisdom",
    "prayers-for-destiny",
    "prayers-for-illumination",
    "prayers-to-springtime",
];
const levelCaps = ["min", "half", "max"];

// as of 07 feb 2024 no more characters were added to the full release of the game

const fetchArtifacts = fetch(`https://genshin.jmp.blue/artifacts`)
    .then((result) => result.json())
    .then((artifactList) => {
        function randomizeArtifact(whichArtifact, artifactPiece) {
            const generatedStat = Math.floor(
                Math.random() * whichArtifact.length
            );
            let generatedArtifactSet = Math.floor(
                Math.random() * artifactList.length
            );
            const generatedLevelCap = Math.floor(
                Math.random() * levelCaps.length
            );
            if (artifactTypeWithoutCirclet.includes(artifactPiece)) {
                if (!blockedSets.includes(artifactList[generatedArtifactSet])) {
                    return {
                        mainStat: whichArtifact[generatedStat],
                        artifactSet: artifactList[generatedArtifactSet],
                        artifactRarity: levelCaps[generatedLevelCap],
                    };
                } else {
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
                        mainStat: whichArtifact[generatedStat],
                        artifactSet: artifactList[generatedArtifactSet],
                        artifactRarity: levelCaps[generatedLevelCap],
                    };
                }
            } else {
                return {
                    mainStat: whichArtifact[generatedStat],
                    artifactSet: artifactList[generatedArtifactSet],
                    artifactRarity: levelCaps[generatedLevelCap],
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
