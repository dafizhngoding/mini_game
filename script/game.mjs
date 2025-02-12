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
import {
    removeTakenMobsLvl
} from "./helper/removeHandler.mjs";
// import { HandlerStageLvl } from "./helper/handleStageLvl.mjs";
import {
    CreateLevel_1
} from "./levels/level_1.mjs";
import {
    CreateLevel_2,
    removeTakenMobs,
} from "./levels/level_2.mjs";
import {
    CreateLevel_3
} from "./levels/level_3.mjs";
// import {
//     CreateLevel_3,
//     // removeTakenMobsLvl3
// } from "./levels/level_3.mjs";
import {
    itemsDetectorColl
} from "./utils/collision_detector_items.mjs";
import {
    detectCollisionsMobs
} from "./utils/collision_detector_mobs.mjs";

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
    sessionStorage.removeItem("defeatedMobsLevel2Stage");
    sessionStorage.removeItem("defeatedMobsLevel3Stage");
    sessionStorage.removeItem("defeatedMobsLevel3");
    sessionStorage.removeItem("score")

    setTimeout(() => {
        stageText.classList.add("show");

        setTimeout(() => {
            stageText.classList.remove("show");
            stageText.classList.add("hide");

        }, 2000);
    }, 500);
};


const input = new InputHandler();
const levelManager = new LevelManager();
console.log(levelManager);
let score = sessionStorage.getItem("score");
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

        handleStageLvl(level, coll, currentLevel);
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

        // if (score) {
        //     document.getElementById("score").innerText = `${score || 0 }`;
        //     console.log("nambah score");
        // } else {
        //                 document.getElementById("score").innerText = `${score || 0}`;

        // }
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
        const handleStageReturn = handleStageLvl(level, coll, currentLevel, )
        let filter = defeatedMobs?.map(mobs => mobs?.id) || 0
        const aliveMobs = currentLevel.Mobs.filter(mob => !filter.includes(mob.id));

        currentLevel.Mobs.slice(handleStageReturn.firstMobs, handleStageReturn.MobsAmount).filter(m => !filter?.includes(m.id)).map(mob => {
            mob.draw(ctx);
            mob.followPlayer(currentLevel.player, currentLevel.Mobs);
        });
        // console.log(mob?.objB?.id);

        const attack = currentLevel.Mobs.slice(handleStageReturn.firstMobs, handleStageReturn.MobsAmount).filter((mob, index) => mob.id !== filter.at(index)).map(mob => mob.followPlayer(currentLevel.player, currentLevel.Mobs));
        if (attack.at(0)?.attack === true) {
            let currentTime = Date.now();
            if (currentTime - lastAttackTime > attackCooldown) {
                let hp = document.getElementById("hp");
                let currentHp = parseFloat(getComputedStyle(hp).width);

                if (currentHp > 0) {
                    hp.style.width = Math.max(0, currentHp - 50) + 'px';
                } else if (currentHp <= 0) {
                    // currentLevel.Player.dead()
                    setTimeout(() => {
                        window.location.href = "/src/pages/gameOver.html"
                    }, 500)
                }

                lastAttackTime = currentTime;
            }
        }

        // Render player
        currentLevel.player.draw(ctx, canvas);
        currentLevel.player.setCollision(currentLevel.player, ctx);
        currentLevel.player.move(input, undefined, undefined, currentLevel.name, undefined);

        // Serang mobs yang masih hidup
        currentLevel.player.attackMobs(input, mob?.objB, level);

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}


if (level === "level_3") {
    function gameLoop() {

        // storage
        let coll = JSON.parse(sessionStorage.getItem("collectionPlayer")) || [];
        let MobsKilled = JSON.parse(sessionStorage.getItem("defeatedMobsLevel3")) || [];
        removeTakenItems();

        // logic
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let allObjects = [currentLevel.Player, ...currentLevel.mobs];
        let mobDetected = detectCollisionsMobs(allObjects);
        console.log(mobDetected);

        let stageReturn = handleStageLvl(level, coll);
        handleStageLvl(level, coll);

        // let array =[2,3]
        let activeMobs = currentLevel.mobs;
        
        
        let MobsID = MobsKilled.map(m => m?.id) || [];
        activeMobs = activeMobs.filter(m => MobsID.includes(m.id));
       // Ambil hanya mobs yang ada di array [2,3] dan hilangkan yang tidak hidup (ada di MobsKilled)
    

       // Filter mobs yang masih hidup setelah menghapus yang ada di MobsKilled
       let MobsAlive = currentLevel.mobs.filter(m => !MobsID.includes(m.id));

       // Menampilkan dan menggerakkan hanya mobs yang masih hidup
       MobsAlive.slice(0, 1).forEach(m => {
           m.draw(ctx);
           m.followPlayer(currentLevel.Player);
       });

                const attack = currentLevel.mobs.slice(0,1).filter((mob, index) => mob.id !== MobsID.at(index)).map(mob => mob.followPlayer(currentLevel.Player, currentLevel.Mobs));
                if (attack.at(0)?.attack === true) {
                    let currentTime = Date.now();
                    if (currentTime - lastAttackTime > attackCooldown) {
                        let hp = document.getElementById("hp");
                        let currentHp = parseFloat(getComputedStyle(hp).width);

                        if (currentHp > 0) {
                            hp.style.width = Math.max(0, currentHp - 50) + 'px';
                        } else if (currentHp <= 0) {
                            currentLevel.Player.dead()
                            setTimeout(() => {
                                window.location.href = "/src/pages/gameOver.html"
                            },500)
                        }

                        lastAttackTime = currentTime;
                    }
                }

        currentLevel.Player.draw(ctx, mobDetected.objA, mobDetected.objB);
        currentLevel.Player.setCollision(currentLevel.Player, ctx);
        currentLevel.Player.move(input, undefined, undefined, currentLevel.name, undefined);
        currentLevel.Player.attackMobs(input, mobDetected?.objB, level);
        requestAnimationFrame(gameLoop);

    }

    gameLoop();
}