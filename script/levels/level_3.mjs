import { collision } from "../class/collision.mjs";
import { Item } from "../class/items.mjs";
import { Mob } from "../class/mob.mjs";
import { Player } from "../class/player.mjs";

export const CreateLevel_3 = () => { 
    return {
        Player: new Player(100, 124, 200, 200, "player", 2, '/assets/Main Character/Hero 1/Bernafas.gif'),
        mobs: dataMobsLevel3,
        status: "ready",
        name: "level_3",
        items: itemsLvl3,
        collision: collision,
    }
};


export let dataMobsLevel3 = [
    new Mob(900, 600, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif", "goblin", 1, 200, 200, 5),
    new Mob(120, 500, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  2, 400, 400, 5),
    new Mob(340, 230, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  3, 400, 400, 5),
    new Mob(560, 450, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  4, 500, 500, 5),
    new Mob(450, 670, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  5, 500, 500, 5),
    new Mob(360, 520, 200, 200, "Mobs", "/assets/Mobs/Goblin/Bernafas.gif","goblin",  6, 500, 500, 5),
    new Mob(360, 520, 350, 350, "Mobs", "/assets/Mobs/Ogre/Bernafas.gif","ogre",  7, 550, 550, 5),
    new Mob(360, 520, 350, 350, "Mobs", "/assets/Mobs/Ogre/Bernafas.gif","ogre",  8, 550, 550, 5),
    new Mob(360, 520, 350, 350, "Mobs", "/assets/Mobs/Orc/Bernafas.gif","orc",  9, 550, 550, 5),
    
]

export let itemsLvl3 = [
    new Item(240, 430, 50,50, 1,"trash", "trash", "/assets/items/1.png" ),
    new Item(350, 560, 50,50, 2,"trash", "trash", "/assets/items/10.png" ),
    new Item(670, 350, 50,50, 3,"trash", "trash", "/assets/items/8.png" ),
    new Item(120, 460, 50,50, 4,"trash", "trash", "/assets/items/2.png" ),
    new Item(555, 220, 50,50, 5,"trash", "trash", "/assets/items/11.png" ),
    new Item(120, 670, 50,50, 6,"trash", "trash", "/assets/items/12.png" ),
    new Item(120, 870, 50,50, 7,"trash", "trash", "/assets/items/9.png" ),
    new Item(120, 770, 50,50, 8,"trash", "trash", "/assets/items/8.png" ),

]

export function removeDataMobsLvl3(MobsID) {
    const index = dataMobsLevel3.findIndex(m => m?.id === MobsID);
    if (index !== -1) {
        dataMobsLevel3.splice(index,1)
    }
}
export function removeItemsLvl3(ItemID) {
    const index = itemsLvl3.findIndex(m => m?.id === ItemID);
    if (index !== -1) {
        itemsLvl3.splice(index, 1);
    }
}
export function removeTakenItemsLvl3() {
    let takenItems = JSON.parse(sessionStorage.getItem('defeatedItemsLevel3')) || [];
    takenItems = takenItems.filter(m => m!== null && m!== undefined);
    sessionStorage.setItem("defeatedItemsLevel3", JSON.stringify(takenItems));
    const takenItemsIds = takenItems.map(m => m?.id)
    let filter = itemsLvl3.filter(m => !takenItemsIds.includes(m?.id))
    itemsLvl3 = itemsLvl3.filter(m => !takenItemsIds.includes(m?.id))

    return filter
}