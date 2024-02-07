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

const artifactRarity = {
    max_rarity3: [1, 2, 3],
    max_rarity4: [3, 4],
    max_rarity5: [4, 5],
};

// as of 07 feb 2024 no more characters were added to the full release of the game

const fetchArtifacts = fetch(`https://genshin.jmp.blue/artifacts`)
    .then((result) => result.json())
    .then((artifactList) => {
        function randomizeArtifact(whichArtifact) {
            const generatedStat = Math.floor(
                Math.random() * whichArtifact.length
            );
            const generatedArtifactSet = Math.floor(
                Math.random() * artifactList.length
            );
            return {
                mainStat: whichArtifact[generatedStat],
                artifactSet: artifactList[generatedArtifactSet],
                artifactRarity: "placeholder",
            };
        }
        let gobletStat = randomizeArtifact(artifactType.goblet);
        let plumeStat = randomizeArtifact(artifactType.plume);
        let circletStat = randomizeArtifact(artifactType.circlet);
        let flowerStat = randomizeArtifact(artifactType.flower);
        let sandsStat = randomizeArtifact(artifactType.sands);
        console.log(gobletStat, plumeStat, circletStat, flowerStat, sandsStat);
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
