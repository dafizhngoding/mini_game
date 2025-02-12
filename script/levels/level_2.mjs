import {
    collision
} from "../class/collision.mjs";
import {
    Mob
} from "../class/mob.mjs";
import {
    Player
} from "../class/player.mjs";

export let CreateLevel_2 = () => {
    return {
        player: new Player(100, 124, 200, 200, "player", 2, '/assets/Main Character/Hero 1/Bernafas.gif'),
        Mobs: dataMobsLvl2,
        status: "ready",
        name: "level_2",
        collision: collision
    }
};

export let dataMobsLvl2 = [
    new Mob(window.innerWidth - 890, 450, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 1),
    new Mob(window.innerWidth - 780, 460, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 2, 200, 200),
    new Mob(window.innerWidth - 290, 240, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 3, 200, 200),
    new Mob(window.innerWidth - 980, 200, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 4, 250, 250),
    new Mob(window.innerWidth - 999, 300, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 5, 250, 250),
    new Mob(window.innerWidth - 1000, 560, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 6, 250, 250),
    new Mob(window.innerWidth - 768, 421, 350, 350, "Mobs", '/assets/Mobs/Ogre/Bernafas.gif', 'ogre', 7, 350, 350),
    new Mob(window.innerWidth - 190, 367, 350, 350, "Mobs", '/assets/Mobs/Ogre/Bernafas.gif', 'ogre', 8, 350, 350),
    new Mob(window.innerWidth - 1200, 398, 350, 350, "Mobs", '/assets/Mobs/Orc/Bernafas.gif', 'orc', 9, 500, 500),
];

export function removeMobs(itemID) {
    const index = dataMobsLvl2.findIndex(item => item?.id === itemID);
    if (index !== -1) {
        dataMobsLvl2.splice(index, 1);
    }
}


export function removeTakenMobs() {
    let takenMobs = JSON.parse(sessionStorage.getItem('defeatedMobsLevel2')) || [];
    takenMobs = takenMobs.filter(m => m !== null && m !== undefined);
    sessionStorage.setItem("defeatedMobsLevel2", JSON.stringify(takenMobs));
    const takenMobsIds = takenMobs.map(m => m?.id)
   dataMobsLvl2 = dataMobsLvl2.filter(m => !takenMobsIds.includes(m?.id))

    return dataMobsLvl2
}
