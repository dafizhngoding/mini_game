import { collision } from "../class/collision.mjs";
import { Mob } from "../class/mob.mjs";
import { Player } from "../class/player.mjs";

export const CreateLevel_3 = () => { 
    return {
        Player: new Player(100, 124, 200, 200, "player", 2, '/assets/Main Character/Hero 1/Bernafas.gif'),
        mobs: dataMobsLevel3,
        status: "ready",
        name: "level_3",
        collision: collision,
    }
};


export let dataMobsLevel3 = [
    new Mob(900, 600, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif", "goblin", 1, 200, 200, 5),
    new Mob(120, 500, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  2, 400, 400, 5),
    new Mob(340, 230, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  3, 400, 400, 5),
    new Mob(560, 450, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  4, 600, 600, 5),
    new Mob(450, 670, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  5, 600, 600, 5),
    new Mob(360, 520, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  6, 600, 600, 5),
    new Mob(360, 520, 350, 350, "Mobs", "/assets/Mobs/Ogre/Bernafas.gif","ogre",  7, 600, 600, 5),
    new Mob(360, 520, 350, 350, "Mobs", "/assets/Mobs/Ogre/Bernafas.gif","ogre",  8, 600, 600, 5),
    new Mob(360, 520, 350, 350, "Mobs", "/assets/Mobs/Orc/Bernafas.gif","orc",  9, 600, 600, 5),
    
]

export function removeDataMobsLvl3(MobsID) {
    const index = dataMobsLevel3.findIndex(m => m?.id === MobsID);
    if (index !== -1) {
        dataMobsLevel3.splice(index,1)
    }
}