"use strict";

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

function generateBuilds() {
    const character = document.querySelector(".character1").value;
    const fetchCharacterDetails = fetch(
        `https://genshin.jmp.blue/characters/all`
    )
        .then((result) => result.json())
        .then((characterDetails) => {
            for (let i = 0; i < characterDetails.length; i++) {
                if (character === characterDetails[i].name) {
                    let characterRandomizedWeapon;
                    switch (characterDetails[i].weapon) {
                        case "Catalyst":
                            characterRandomizedWeapon =
                                catalystList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                        case "Bow":
                            characterRandomizedWeapon =
                                bowList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                        case "Claymore":
                            characterRandomizedWeapon =
                                claymoreList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                        case "Polearm":
                            characterRandomizedWeapon =
                                polearmList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                        case "Sword":
                            characterRandomizedWeapon =
                                swordList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                    }
                    console.log(characterRandomizedWeapon);
                    break;
                }
            }
        });
}

let swordList = [];
let polearmList = [];
let catalystList = [];
let claymoreList = [];
let bowList = [];

const fetchWeapons = fetch(`https://genshin.jmp.blue/weapons/all`)
    .then((result) => result.json())
    .then((weaponList) => {
        for (let i = 0; i < weaponList.length; i++) {
            switch (weaponList[i].type) {
                case "Catalyst":
                    catalystList.push(weaponList[i].name);
                    break;
                case "Bow":
                    bowList.push(weaponList[i].name);
                    break;
                case "Claymore":
                    claymoreList.push(weaponList[i].name);
                    break;
                case "Polearm":
                    polearmList.push(weaponList[i].name);
                    break;
                case "Sword":
                    swordList.push(weaponList[i].name);
                    break;
            }
        }
    });

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
            }
            const generatedMainStat = Math.floor(
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
    });
