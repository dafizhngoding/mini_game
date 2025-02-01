import { Item } from "../script/class/items.mjs"
import { Mob } from "../script/class/mob.mjs"

export const dataMobsLVL1 = [
    new Mob(300, 100, 200, 200, "goblin", '/assets/Mobs/Goblin/Bernafas.gif'),
    new Mob(200, 500, 200, 200, "goblin", '/assets/Mobs/Goblin/Bernafas.gif'),
    new Mob(500, 300, 200, 200, "goblin", '/assets/Mobs/Goblin/Bernafas.gif')
]

function getRandomX() {
    const minX = -50; // batas minimum X
    const maxX = window.innerWidth; // batas maksimum X (dapat menggunakan window.innerWidth)
    return Math.floor(Math.random() * (maxX - minX + 1)) + minX;
}

function getRandomY() {
    const minY = window.innerHeight - 668; // batas bawah Y
    const maxY = window.innerHeight - 168; // batas atas Y
    return Math.floor(Math.random() * (maxY - minY + 1)) + minY;
}

export const dataItemsLVL1 = [
    new Item(250,600, 50,50, 1, "coin", "item add score" , "/assets/Items/gemYellow.png"),
    new Item(346,324, 50,50, 2, "coin", "item add score" , "/assets/Items/gemYellow.png"),
    new Item(453,234, 50,50, 3, "coin", "item add score", "/assets/Items/gemYellow.png" ),
    new Item(234,542, 50,50, 4, "coin", "item add score", "/assets/Items/gemYellow.png" ),
]

