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
    CreateLevel_1
} from "./levels/level_1.mjs";
import {
    itemsDetectorColl
} from "./utils/collision_detector_items.mjs";

const canvas = document.getElementById("gameCanvas");
const level = document.getElementById("level").innerText;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas.width, canvas.height);
const ctx = canvas.getContext("2d");
console.log(ctx);



window.onload = function () {
    let stageText = document.getElementById("stageText");
    sessionStorage.removeItem("collectionPlayer")

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
levelManager.addLevel(CreateLevel_1(0, 0, canvas.width, canvas.height));

let currentLevel = levelManager.loadLevel(0);

CreateLevel_1(0, 0, canvas.width, canvas.height).player.move(input, boundaries);

console.log(CreateLevel_1(0, 0, canvas.width, canvas.height).player.move(input, boundaries));


let stageDisplayed = false;
let ItemAmount = 4;
let firstAmount = 0;
let dataCleared = false;
 let isResetPosition = false

function gameLoop() {

    // storage
    const coll = JSON.parse(sessionStorage.getItem("collectionPlayer")) || []
    removeTakenItems();


    //  logic
    switch (level) {
        case "level_1":
            if (document.getElementById("stage").innerText === `1/4`) {
                if (coll !== null) {
                    document.getElementById("item").innerText = `${JSON.parse(coll.length)}/4`;
                }
                if (document.getElementById("item").innerText === "4/4" && !stageDisplayed) {
                    stageDisplayed = true;
                    localStorage.setItem("allItemCollected", JSON.stringify(coll))
                    sessionStorage.removeItem("collectionPlayer")
                    if (sessionStorage.getItem("collectionPlayer") === null) {
                        document.getElementById("stage").innerText = `2/4`;
                    } else {
                        sessionStorage.removeItem("collectionPlayer")
                    }
                    // window.Location.reload();
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `${2}`
                    setTimeout(() => {
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            document.getElementById("item").innerText = `0/6`;
                        }, 2000);
                    }, 500);
                    sessionStorage.removeItem("collectionPlayer")
                }
                stageDisplayed = false;
            }
            if (document.getElementById("stage").innerText === `2/4`) {
               
                if (coll !== null) {
                    document.getElementById("item").innerText = `${JSON.parse(coll.length)}/6`;
                }

                if (document.getElementById("item").innerText === `6/6` && !stageDisplayed) {
                    stageDisplayed = true;
                    const data = JSON.parse(localStorage.getItem("allItemCollected"));
                    localStorage.setItem("allItemCollected", JSON.stringify([...data, ...coll]))
                    if (sessionStorage.getItem("collectionPlayer") === null) {
                        document.getElementById("stage").innerText = `2/4`;
                    } else {
                        sessionStorage.removeItem("collectionPlayer")
                    }
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `${3}`
                    setTimeout(() => {
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            document.getElementById("item").innerText = `0/6`;
                        }, 2000);
                    }, 500);
                    sessionStorage.removeItem("collectionPlayer")

                }
                ItemAmount = 10;
                firstAmount = 4;

                if (dataCleared === false) {
                    // console.log("ok");
                    sessionStorage.setItem("collectionPlayer", JSON.stringify([]));
                    setTimeout(() => {
                        dataCleared = true;
                    }, 1000)
                    // dataCleared = true; // Set flag supaya tidak dihapus lagi
                }
                stageDisplayed = false;
            }

            if (document.getElementById("stage").innerText === `3/4`) {


                dataCleared = false
                if (coll !== null) {
                    document.getElementById("item").innerText = `${JSON.parse(coll.length)}/6`;
                } else {
                    sessionStorage.removeItem("collectionPlayer")
                }

                if (document.getElementById("item").innerText === `6/6` && !stageDisplayed) {
                    stageDisplayed = true;
                    const data = JSON.parse(localStorage.getItem("allItemCollected"));
                    localStorage.setItem("allItemCollected", JSON.stringify([...data, ...coll]))
                    if (sessionStorage.getItem("collectionPlayer") === null) {
                        document.getElementById("stage").innerText = `3/4`;
                    } else {
                        sessionStorage.removeItem("collectionPlayer")
                    }
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `${4}`
                    setTimeout(() => {
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            document.getElementById("item").innerText = `0/6`;
                        }, 2000);
                    }, 500);
                    sessionStorage.removeItem("collectionPlayer")
                }
                ItemAmount = 16;
                firstAmount = 10;

                if (dataCleared === false) {
                    console.log("ok");
                    // sessionStorage.setItem("collectionPlayer", JSON.stringify([]));
                    // setTimeout(() => {
                    //     dataCleared = true;
                    // }, 1000)
                    // dataCleared = true; // Set flag supaya tidak dihapus lagi
                } else {
                    console.log("ok");
                }
                stageDisplayed = false;
            }
            if (document.getElementById("stage").innerText === `4/4`) {

                if (coll !== null) {
                                    dataCleared = false

                    document.getElementById("item").innerText = `${JSON.parse(coll.length)}/6`;
                } else {
                                    dataCleared = false

                    sessionStorage.removeItem("collectionPlayer")

                }

                if (document.getElementById("item").innerText === `6/6` && !stageDisplayed) {
                    stageDisplayed = true;
                    const data = JSON.parse(localStorage.getItem("allItemCollected"));
                    localStorage.setItem("allItemCollected", JSON.stringify([...data, ...coll]))
                    if (sessionStorage.getItem("collectionPlayer") === null) {
                        document.getElementById("stage").innerText = `2/4`;
                    } else {
                        sessionStorage.removeItem("collectionPlayer")
                    }
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `${4}`
                    setTimeout(() => {
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            document.getElementById("item").innerText = `0/6`;
                        }, 2000);
                    }, 500);
                    sessionStorage.removeItem("collectionPlayer")
                }
                ItemAmount = 16;
                firstAmount = 10;

                if (dataCleared === false) {
                    console.log("ok");
                    sessionStorage.setItem("collectionPlayer", JSON.stringify([]));
                    setTimeout(() => {
                        dataCleared = true;
                    }, 1000)
                    dataCleared = true; // Set flag supaya tidak dihapus lagi
                } else {
                    console.log("ok");
                }
                stageDisplayed = false;
            }

            default:
                // console.log("Level not found");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentLevel.player.draw(ctx);
    currentLevel.player.setCollision(currentLevel.player, ctx)
    currentLevel.player.move(input, undefined, undefined, currentLevel.name, undefined);
    const allObjects = [currentLevel.player, ...currentLevel.item];
    const items = itemsDetectorColl(allObjects)
    currentLevel.player.collectItems(items, currentLevel.name, input)
    let filter = coll?.map(item => item?.id) || 0
    itemsDetectorColl(allObjects)
    currentLevel.item.slice(firstAmount, ItemAmount).filter(item => (filter ? !filter?.includes(item.id) : item.id === filter)).map(item => item.draw(ctx));


    requestAnimationFrame(gameLoop);
}



gameLoop();