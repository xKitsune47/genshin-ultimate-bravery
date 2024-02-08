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

let characterArtifacts;
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
        characterArtifacts = {
            goblet: randomizeArtifact(artifactType.goblet, "goblet"),
            plume: randomizeArtifact(artifactType.plume, "plume"),
            circlet: randomizeArtifact(artifactType.circlet, "circlet"),
            flower: randomizeArtifact(artifactType.flower, "flower"),
            sands: randomizeArtifact(artifactType.sands, "sands"),
        };
    });

let swordList = [];
let polearmList = [];
let catalystList = [];
let claymoreList = [];
let bowList = [];

fetch(`https://genshin.jmp.blue/weapons/all`)
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

let characterBuild = {
    name: null,
    weapon: null,
    artifacts: null,
};

function generateBuilds(character) {
    characterBuild.name = character;
    fetch(`https://genshin.jmp.blue/characters/all`)
        .then((result) => result.json())
        .then((characterDetails) => {
            for (let i = 0; i < characterDetails.length; i++) {
                if (character === characterDetails[i].name) {
                    let characterRandomizedWeapon;
                    switch (characterDetails[i].weapon) {
                        case "Catalyst":
                            characterBuild.weapon =
                                catalystList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                        case "Bow":
                            characterBuild.weapon =
                                bowList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                        case "Claymore":
                            characterBuild.weapon =
                                claymoreList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                        case "Polearm":
                            characterBuild.weapon =
                                polearmList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                        case "Sword":
                            characterBuild.weapon =
                                swordList[
                                    Math.floor(
                                        Math.random() * catalystList.length
                                    )
                                ];
                            break;
                    }
                    characterBuild.artifacts = characterArtifacts;
                    console.log(characterBuild);
                    break;
                }
            }
        });
    showBuildDetails();
}

function showBuildDetails() {
    const parentElement = document.querySelector(".characterCard");
    parentElement.innerHTML += `<h2>Your build for ${characterBuild.name}:</h2>`;
    setTimeout(() => {
        fetch(`https://genshin.jmp.blue/artifacts/all`)
            .then((result) => result.json())
            .then((artifactPieceName) => {
                const circletSetName =
                    characterBuild.artifacts.circlet.artifactSet
                        .replaceAll(" ", "-")
                        .replaceAll("'", "-")
                        .toLowerCase();
                const flowerSetName =
                    characterBuild.artifacts.flower.artifactSet
                        .replaceAll(" ", "-")
                        .replaceAll("'", "-")
                        .toLowerCase();
                const gobletSetName =
                    characterBuild.artifacts.goblet.artifactSet
                        .replaceAll(" ", "-")
                        .replaceAll("'", "-")
                        .toLowerCase();
                const plumeSetName = characterBuild.artifacts.plume.artifactSet
                    .replaceAll(" ", "-")
                    .replaceAll("'", "-")
                    .toLowerCase();
                const sandsSetName = characterBuild.artifacts.sands.artifactSet
                    .replaceAll(" ", "-")
                    .replaceAll("'", "-")
                    .toLowerCase();
                const artifactsImgs = {
                    circletSetName: [
                        `https://genshin.jmp.blue/artifacts/${circletSetName}/circlet-of-logos`,
                        circletSetName,
                    ],
                    flowerSetName: [
                        `https://genshin.jmp.blue/artifacts/${flowerSetName}/circlet-of-logos`,
                        flowerSetName,
                    ],
                    gobletSetName: [
                        `https://genshin.jmp.blue/artifacts/${gobletSetName}/circlet-of-logos`,
                        gobletSetName,
                    ],
                    plumeSetName: [
                        `https://genshin.jmp.blue/artifacts/${plumeSetName}/circlet-of-logos`,
                        plumeSetName,
                    ],
                    sandsSetName: [
                        `https://genshin.jmp.blue/artifacts/${sandsSetName}/circlet-of-logos`,
                        sandsSetName,
                    ],
                };
                const mapArtifactsImgs = new Map(Object.entries(artifactsImgs));
                for (let [key, value] of mapArtifactsImgs) {
                    fetch(value)
                        .then((imgResult) => imgResult)
                        .then((fetchedImg) => {
                            parentElement.innerHTML += `
                            <span>
                                <img src="${value[0]}" alt="${value[1]}">
                                <h3>Main stat: ${4}</h3>
                            </span>
                            `;
                        });
                }
            });
    }, 500);
}

async function fetchCharacterIcons() {
    const fetchIcons = await fetch(
        `https://genshin.jmp.blue/characters/all`
    ).then((result) =>
        result.json().then((character) => {
            let parentElement = document.querySelector(".chooseCharacter");
            let formattedCharacter;
            for (let i = 0; i < character.length; i++) {
                parentElement.innerHTML += `<button onclick="generateBuilds('${
                    character[i].name
                }');"  class="characterButton"><img src="https://genshin.jmp.blue/characters/${character[
                    i
                ].name
                    .replace(" ", "-")
                    .toLowerCase()}/icon-big" alt="${
                    character[i].name
                }"></button>`;
            }
        })
    );
}
fetchCharacterIcons();

// location.reload()
function placeholderFunction(variable) {
    console.log(variable);
}
