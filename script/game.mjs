import {
    InputHandler
} from "./class/inputHandler.mjs";
import {
    LevelManager
} from "./class/level.mjs";
import {
    Player
} from "./class/player.mjs";
import {
    CreateLevel_1
} from "./levels/level_1.mjs";

const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas.width, canvas.height);
const ctx = canvas.getContext("2d");
console.log(ctx);


export const boundaries = [{
        x: 0,
        y: 0,
        width: 800,
        height: 10
    }, // Dinding atas
    {
        x: 0,
        y: 590,
        width: 800,
        height: 10
    }, // Dinding bawah
    {
        x: 0,
        y: 0,
        width: 10,
        height: 600
    }, // Dinding kiri
    {
        x: 790,
        y: 0,
        width: 10,
        height: 600
    } // Dinding kanan
];



const input = new InputHandler();
console.log(input);
const levelManager = new LevelManager();
console.log(levelManager);
levelManager.addLevel(CreateLevel_1());

// Tambahkan level ke LevelManager
// console.log("level telah di tambah");
let currentLevel = levelManager.loadLevel(0); // Mulai dari level 1

CreateLevel_1().player.move(input, boundaries);

console.log(CreateLevel_1().player.move(input, boundaries));

console.log(currentLevel);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     let allCollisions = [currentLevel.player, ...currentLevel.mob];
    currentLevel.player.setCollision(currentLevel.player, ctx)
    currentLevel.mob.map((mob, index) => mob.setCollision(currentLevel.mob[index], ctx));
    currentLevel.player.move(input, undefined, undefined, currentLevel.name, currentLevel.mob);
    currentLevel.mob.map(mobs => mobs.draw(ctx));
    currentLevel.mob.map(mobs => mobs.followPlayer(currentLevel.player, currentLevel.mob))
    currentLevel.item.map(item => item.draw(ctx));
    currentLevel.player.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();