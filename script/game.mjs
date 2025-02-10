import {
    boundaries
} from "../data/boundaries.mjs";
import {
    dataItemsLVL1,
    generateItems,
    removeTakenItems
} from "../data/level_1.mjs";
import {
    InputHandler
} from "./class/inputHandler.mjs";
import {
    LevelManager
} from "./class/level.mjs";
import {
    handleStageLvl
} from "./helper/handleStageLvl.mjs";
// import { HandlerStageLvl } from "./helper/handleStageLvl.mjs";
import {
    CreateLevel_1
} from "./levels/level_1.mjs";
import {
    CreateLevel_2,
    removeMobs,
    removeTakenMobs
} from "./levels/level_2.mjs";
import {
    CreateLevel_3
} from "./levels/level_3.mjs";
import {
    itemsDetectorColl
} from "./utils/collision_detector_items.mjs";
import { detectCollisionsMobs } from "./utils/collision_detector_mobs.mjs";

const canvas = document.getElementById("gameCanvas");
const level = document.getElementById("level").innerText;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let currentLevel;



window.onload = function () {

    
    let stageText = document.getElementById("stageText");
    sessionStorage.removeItem("collectionPlayer")
    sessionStorage.removeItem("defeatedMobsLevel2")
    sessionStorage.removeItem("defeatedMobsLevel2Stage")

    setTimeout(() => {
        stageText.classList.add("show");

        setTimeout(() => {
            stageText.classList.remove("show");
            stageText.classList.add("hide");

        }, 2000);
    }, 500);
};


const input = new InputHandler();
console.log(input);
const levelManager = new LevelManager();
console.log(levelManager);
if (level === "level_1") {
    levelManager.addLevel(CreateLevel_1());
    currentLevel = levelManager.loadLevel(0);
    CreateLevel_1();
}


if (level === "level_2") {
    levelManager.addLevel(CreateLevel_2());
    currentLevel = levelManager.loadLevel(0);
    CreateLevel_2();
}

if (level === "level_3") {
    levelManager.addLevel(CreateLevel_3());
    currentLevel = levelManager.loadLevel(0);
    CreateLevel_3();
}



//  let isResetPosition = false
if (level === "level_1") {
    function gameLoop() {

        // storage
        const coll = JSON.parse(sessionStorage.getItem("collectionPlayer")) || []
        removeTakenItems();

        handleStageLvl(level, coll,currentLevel);
        let handleStage = handleStageLvl(level, coll);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const allObjects = [currentLevel.player, ...currentLevel.item];
        const items = itemsDetectorColl(allObjects)
        let filter = coll?.map(item => item?.id) || 0
        currentLevel.item.slice(handleStage.firstAmount, handleStage.ItemAmount).filter(item => (filter?!filter?.includes(item.id) : item.id === filter)).map(item => item.draw(ctx));
        currentLevel.player.draw(ctx, canvas);
        currentLevel.player.collectItems(items, currentLevel.name, input)
        currentLevel.player.setCollision(currentLevel.player, ctx)
        currentLevel.player.move(input, undefined, undefined, currentLevel.name, undefined);
        itemsDetectorColl(allObjects)


        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    console.log("level_1");
}
let lastAttackTime = 0; // Waktu terakhir diserang
const attackCooldown = 2000; // Cooldown 1000ms = 1 detik
if (level === "level_2") {

    
    function gameLoop() {

                const coll = JSON.parse(sessionStorage.getItem("collectionPlayer")) || []
        removeTakenItems();
        removeTakenMobs();
        // Ambil data mobs yang sudah mati dari sessionStorage
        const defeatedMobs = JSON.parse(sessionStorage.getItem("defeatedMobsLevel2")) || [];

        // Filter mobs yang masih hidup
        // const aliveMobs = currentLevel.Mobs.filter(m => );

        // Clear canvas untuk render ulang
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Handle stage logic
        
        // Slicing hanya mobs yang masih hidup
    
        const allObjects = [currentLevel.player, ...currentLevel.Mobs];
        const mob = detectCollisionsMobs(allObjects)
        handleStageLvl(level, coll, currentLevel, mob);
        const handleStageReturn = handleStageLvl(level, coll, currentLevel,)
        let filter = defeatedMobs?.map(mobs => mobs?.id) || 0
        const aliveMobs = currentLevel.Mobs.filter(mob => !filter.includes(mob.id));
        console.log(aliveMobs)
        
    currentLevel.Mobs.slice(handleStageReturn.firstMobs,handleStageReturn.MobsAmount).filter(m => !filter?.includes(m.id)).map(mob => {
        mob.draw(ctx);
        mob.followPlayer(currentLevel.player, currentLevel.Mobs);
    });
        // console.log(mob?.objB?.id);

        const attack = currentLevel.Mobs.slice(handleStageReturn.firstMobs, handleStageReturn.MobsAmount).filter((mob,index) => mob.id !== filter.at(index)).map(mob => mob.followPlayer(currentLevel.player, currentLevel.Mobs));
        if (attack.at(0)?.attack === true) {
            let currentTime = Date.now();
            if (currentTime - lastAttackTime > attackCooldown) {
                let hp = document.getElementById("hp");
                let currentHp = parseFloat(getComputedStyle(hp).width);

                if (currentHp > 0) {
                    hp.style.width = Math.max(0, currentHp - 50) + 'px';
                    console.log("Terkena damage! HP berkurang 50px");
                } else {
                    console.log("HP sudah habis!");
                }

                lastAttackTime = currentTime;
            }
        }

        // Render player
        currentLevel.player.draw(ctx, canvas);
        currentLevel.player.setCollision(currentLevel.player, ctx);
        currentLevel.player.move(input, undefined, undefined, currentLevel.name, undefined);

        // Serang mobs yang masih hidup
        currentLevel.player.attackMobs(input, mob?.objB,);

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}


if (level === "level_3") {

    function gameLoop() {
        // storage
        const coll = JSON.parse(sessionStorage.getItem("collectionPlayer")) || []
        removeTakenItems();

        // logic
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        handleStageLvl(level, coll, currentLevel);
        currentLevel.mobs.slice(0, 1).map(mobs => mobs.draw(ctx));
        currentLevel.mobs.slice(0, 1).map(mobs => mobs.followPlayer(currentLevel.player, currentLevel.mobs));

        currentLevel.player.draw(ctx, canvas);
        currentLevel.player.setCollision(currentLevel.player, ctx)
        currentLevel.player.move(input, undefined, undefined, currentLevel.name, undefined);
        currentLevel.player.attackMobs(input, currentLevel.Mobs.map(mob => mob), currentLevel);

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}