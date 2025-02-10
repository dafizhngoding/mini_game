import { collision } from "../class/collision.mjs";
import { Mob } from "../class/mob.mjs";
import { Player } from "../class/player.mjs";

export const CreateLevel_3 = () => { 
    return {
        player: new Player(100,100,200,200,"player", 2, '/assets/Main Character/Hero 1/Bernafas.gif'),
        name: "level_3",
        status: "ready",
        mobs: dataMobsLvl3,
        collision: collision,
    }
};
 
const dataMobsLvl3 = [
    new Mob(600, 540, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin'),
    new Mob(300, 460, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin'),
    new Mob(680, 120, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin'),
    new Mob(780, 200, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin'),
    new Mob(450, 300, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin'),
]