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
async function fetchArtifacts() {
    await fetch(`https://genshin.jmp.blue/artifacts/all`)
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
                    if (
                        blockedSets.includes(artifactList[generatedArtifactSet])
                    ) {
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
                            artifactSet:
                                artifactList[generatedArtifactSet].name,
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
            characterBuild.artifacts = {
                goblet: randomizeArtifact(artifactType.goblet, "goblet"),
                plume: randomizeArtifact(artifactType.plume, "plume"),
                circlet: randomizeArtifact(artifactType.circlet, "circlet"),
                flower: randomizeArtifact(artifactType.flower, "flower"),
                sands: randomizeArtifact(artifactType.sands, "sands"),
            };
            return;
        });
}

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

function randomizeWeapon(weaponType) {
    switch (weaponType) {
        case "Catalyst":
            return catalystList[
                Math.floor(Math.random() * catalystList.length)
            ];
        case "Bow":
            return bowList[Math.floor(Math.random() * catalystList.length)];
        case "Claymore":
            return claymoreList[
                Math.floor(Math.random() * catalystList.length)
            ];
        case "Polearm":
            return polearmList[Math.floor(Math.random() * catalystList.length)];
        case "Sword":
            return swordList[Math.floor(Math.random() * catalystList.length)];
    }
}

let characterBuild = {
    name: null,
    weapon: null,
    artifacts: null,
};

function generateBuilds(character) {
    document.querySelector(
        ".characterCard"
    ).innerHTML = `<div class="titleCard"></div>
    <div class="artifactsCard"></div>
    <div class="weaponCard"></div>
    <div class="bossCard"></div>`;

    characterBuild.name = character;
    fetch(`https://genshin.jmp.blue/characters/all`)
        .then((result) => result.json())
        .then((characterDetails) => {
            for (let i = 0; i < characterDetails.length; i++) {
                if (character === characterDetails[i].name) {
                    characterBuild.weapon = randomizeWeapon(
                        characterDetails[i].weapon
                    );
                    characterBuild.artifacts = fetchArtifacts();
                    break;
                }
            }
        });
    showBuildDetails();
}

function showBuildDetails() {
    document.querySelector(
        ".titleCard"
    ).innerHTML += `<h2>Your build for ${characterBuild.name}:</h2>`;
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
                        characterBuild.artifacts.circlet.artifactRarity,
                        characterBuild.artifacts.circlet.mainStat,
                    ],
                    flowerSetName: [
                        `https://genshin.jmp.blue/artifacts/${flowerSetName}/flower-of-life`,
                        flowerSetName,
                        characterBuild.artifacts.flower.artifactRarity,
                        characterBuild.artifacts.flower.mainStat,
                    ],
                    gobletSetName: [
                        `https://genshin.jmp.blue/artifacts/${gobletSetName}/goblet-of-eonothem`,
                        gobletSetName,
                        characterBuild.artifacts.goblet.artifactRarity,
                        characterBuild.artifacts.goblet.mainStat,
                    ],
                    plumeSetName: [
                        `https://genshin.jmp.blue/artifacts/${plumeSetName}/plume-of-death`,
                        plumeSetName,
                        characterBuild.artifacts.plume.artifactRarity,
                        characterBuild.artifacts.plume.mainStat,
                    ],
                    sandsSetName: [
                        `https://genshin.jmp.blue/artifacts/${sandsSetName}/sand-of-eon`,
                        sandsSetName,
                        characterBuild.artifacts.sands.artifactRarity,
                        characterBuild.artifacts.sands.mainStat,
                    ],
                };
                const parentElement = document.querySelector(".artifactsCard");
                const mapArtifactsImgs = new Map(Object.entries(artifactsImgs));
                function artifactRarityColor(colorNumber) {
                    switch (parseInt(colorNumber)) {
                        case 1:
                            return `#C6BCB7`;
                        case 2:
                            return `#73A570`;
                        case 3:
                            return `#559CAD`;
                        case 4:
                            return `#8C5383`;
                        case 5:
                            return `#DE9235`;
                    }
                }
                function artifactPiece(key) {
                    switch (key) {
                        case "circletSetName":
                            return "Circlet";
                        case "flowerSetName":
                            return "Flower";
                        case "gobletSetName":
                            return "Goblet";
                        case "plumeSetName":
                            return "Plume";
                        case "sandsSetName":
                            return "Sands";
                    }
                }
                for (let [key, value] of mapArtifactsImgs) {
                    fetch(value[0]).then((imgResult) => {
                        parentElement.innerHTML += `
                            <span>
                                <h3>${artifactPiece(key)}</h3>
                                <img src="${value[0]}" alt="${
                            value[1]
                        }" style="background-color: ${artifactRarityColor(
                            value[2]
                        )}">
                                <h3>${value[3]}</h3>
                            </span>
                            `;
                    });
                }
            });
        const characterWeapon = characterBuild.weapon.replaceAll(" ", "_");
        document.querySelector(".weaponCard").innerHTML = `
                    <img src="https://rerollcdn.com/GENSHIN/Weapons/${characterWeapon}.png" alt="${characterWeapon}">
                    <h3>${characterBuild.weapon}</h3>
                    `;
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
                let tempCharacter = character[i].name;
                if (tempCharacter === "Raiden Shogun") {
                    formattedCharacter = "Raiden";
                } else if (tempCharacter === "Tartaglia") {
                    formattedCharacter = "Childe";
                } else if (tempCharacter === "Kujou Sara") {
                    formattedCharacter = "Sara";
                } else if (tempCharacter === "Traveler") {
                    formattedCharacter = "Traveler%20(Anemo)";
                } else if (tempCharacter.includes(" ")) {
                    if (
                        tempCharacter.slice(0, tempCharacter.indexOf(" "))
                            .length > 5
                    ) {
                        formattedCharacter = tempCharacter.slice(
                            tempCharacter.indexOf(" ") + 1
                        );
                    } else {
                        formattedCharacter = tempCharacter.replaceAll(
                            " ",
                            "%20"
                        );
                    }
                } else {
                    formattedCharacter = tempCharacter;
                }

                parentElement.innerHTML += `<button onclick="generateBuilds('${character[i].name}');"  class="characterButton">
                <img src="https://rerollcdn.com/GENSHIN/Characters/1/${formattedCharacter}.png" alt="${character[i].name}">
                </button>`;
            }
        })
    );
}
fetchCharacterIcons();
