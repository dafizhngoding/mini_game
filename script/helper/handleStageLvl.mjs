import {
    dataMobsLvl2
} from "../levels/level_2.mjs";

export const handleStageLvl = (level, coll, currentLevel, mob = {}) => {
    let stageDisplayed = JSON.parse(sessionStorage.getItem("stageDisplayed")) || false;
    let ItemAmount = 4;
    let MobsAmount = 1;
    let firstMobs = 0
    let firstAmount = 0;
    let defeatedMobsLvl2 = JSON.parse(sessionStorage.getItem("defeatedMobsLevel2Stage"))
    let defeatedMobsLvl3 = JSON.parse(sessionStorage.getItem("defeatedMobsLevel3Stage"))
    let dataCleared = JSON.parse(sessionStorage.getItem("dataCleared")) || false;
    let isFinish = JSON.parse(sessionStorage.getItem("levelCompleted")) || false;


    const resetSessionStorage = () => {
        sessionStorage.removeItem("collectionPlayer");
    };

    //  const filterDefeatedMobs = (mobs) => {
    //      return mobs?.filter(mob => !defeatedAllMobsLvl2.some(defeatedMob => defeatedMob.id === mob.id));
    //  };


    switch (level) {
        case "level_1":
            sessionStorage.setItem("levelCompleted", false);

            // STAGE 1/4
            if (document.getElementById("stage").innerText === `1/4`) {
                if (coll !== null) {
                    document.getElementById("item").innerText = `${coll.length}/4`;
                }
                if (document.getElementById("item").innerText === "4/4" && !stageDisplayed) {
                    stageDisplayed = true;
                    localStorage.setItem("allItemCollected", JSON.stringify(coll));

                    if (!sessionStorage.getItem("stage1Cleared")) {
                        sessionStorage.removeItem("collectionPlayer");
                    }

                    document.getElementById("stage").innerText = `2/4`;

                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `2`;

                    setTimeout(() => {
                        resetSessionStorage();
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            document.getElementById("item").innerText = `0/6`;
                            sessionStorage.setItem("stageDisplayed", false);
                        }, 2000);
                    }, 500);
                }
            }

            // STAGE 2/4
            if (document.getElementById("stage").innerText === `2/4`) {
                if (coll !== null) {
                    document.getElementById("item").innerText = `${coll.length}/6`;
                }

                if (document.getElementById("item").innerText === `6/6` && !stageDisplayed) {
                    stageDisplayed = true;
                    const data = JSON.parse(localStorage.getItem("allItemCollected"));
                    localStorage.setItem("allItemCollected", JSON.stringify([...data, ...coll]));

                    if (!sessionStorage.getItem("stage2Cleared")) {
                        sessionStorage.removeItem("collectionPlayer");
                    }

                    document.getElementById("stage").innerText = `3/4`;

                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `3`;

                    setTimeout(() => {
                        resetSessionStorage();
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            document.getElementById("item").innerText = `0/6`;
                            sessionStorage.setItem("stageDisplayed", false);
                        }, 2000);
                    }, 500);
                }

                ItemAmount = 10;
                firstAmount = 4;

                if (!dataCleared) {
                    sessionStorage.removeItem("collectionPlayer");
                    dataCleared = true;
                    sessionStorage.setItem("dataCleared", true);
                }
            }

            // STAGE 3/4
            if (document.getElementById("stage").innerText === `3/4`) {
                if (coll !== null) {
                    document.getElementById("item").innerText = `${coll.length}/6`;
                }

                if (document.getElementById("item").innerText === `6/6` && !stageDisplayed) {
                    stageDisplayed = true;
                    const data = JSON.parse(localStorage.getItem("allItemCollected"));
                    localStorage.setItem("allItemCollected", JSON.stringify([...data, ...coll]));

                    if (!sessionStorage.getItem("stage3Cleared")) {
                        sessionStorage.removeItem("collectionPlayer");
                    }

                    document.getElementById("stage").innerText = `4/4`;

                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `4`;

                    setTimeout(() => {
                        resetSessionStorage();
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            document.getElementById("item").innerText = `0/6`;
                            sessionStorage.setItem("stageDisplayed", false);
                        }, 2000);
                    }, 500);
                }

                ItemAmount = 16;
                firstAmount = 10;

                if (!dataCleared) {
                    sessionStorage.removeItem("collectionPlayer");
                    dataCleared = true;
                    sessionStorage.setItem("dataCleared", true);
                }
            }

            // STAGE 4/4
            if (document.getElementById("stage").innerText === `4/4` && isFinish === false) {

                if (coll !== null) {
                    document.getElementById("item").innerText = `${coll.length}/6`;
                }

                if (document.getElementById("item").innerText === `6/6` && !stageDisplayed) {
                    stageDisplayed = true;
                    const data = JSON.parse(localStorage.getItem("allItemCollected"));
                    localStorage.setItem("allItemCollected", JSON.stringify([...data, ...coll]));

                    if (!sessionStorage.getItem("stage4Cleared")) {
                        sessionStorage.removeItem("collectionPlayer");
                    }
                    // document.getElementById("stage").innerText = `4/4`;

                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `completed`;
                    sessionStorage.setItem("levelCompleted", true)

                    setTimeout(() => {
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            document.getElementById("item").innerText = `0/6`;
                            sessionStorage.setItem("stageDisplayed", false);
                            sessionStorage.setItem("levelCompleted", true);

                            resetSessionStorage();
                        }, 2000);
                    }, 500);
                }



                ItemAmount = 22;
                firstAmount = 16;

                if (!dataCleared) {
                    sessionStorage.removeItem("collectionPlayer");
                    dataCleared = true;
                    sessionStorage.setItem("dataCleared", true);
                }
            }

            if (isFinish === true && document.getElementById("stage").innerText === "4/4") {
                firstAmount = 0;
                ItemAmount = 0;
                window.location.href = "/src/pages/missionSuccess.html"
            }

            break;

        case "level_2":
            sessionStorage.setItem("levelCompleted", false);

            if (document.getElementById("stage").innerText === `1/4`) {
                if (defeatedMobsLvl2 !== null) {
                    document.getElementById("mobs").innerText = `${defeatedMobsLvl2.length}/1`
                }

                if (document.getElementById("mobs").innerText === "1/1" && !stageDisplayed) {
                    stageDisplayed = true;
                    // localStorage.setItem("allMobs", JSON.stringify(defeatedMobsLvl2));
                    document.getElementById("stage").innerText = "2/4";
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `2`;
                    setTimeout(() => {
                        sessionStorage.removeItem("defeatedMobsLevel2Stage");
                        resetSessionStorage();
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            sessionStorage.setItem("stageDisplayed", false);
                            document.getElementById("mobs").innerText = `0/2`;
                        }, 2000);
                    }, 500);
                }
            }


            if (document.getElementById("stage").innerText === "2/4") {
                if (defeatedMobsLvl2 !== null) {
                    document.getElementById("mobs").innerText = `${defeatedMobsLvl2.length}/2`
                }
                if (document.getElementById("mobs").innerText === "2/2" && !stageDisplayed) {
                    stageDisplayed = true;
                    // let data = JSON.parse(localStorage.getItem("allMobs"));
                    // localStorage.setItem("allMobs", JSON.stringify([...data, ...defeatedMobsLvl2]));
                    document.getElementById("stage").innerText = "3/4";
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `3`;
                    sessionStorage.removeItem("defeatedMobsLevel2Stage");

                    setTimeout(() => {
                        resetSessionStorage();
                        sessionStorage.removeItem("defeatedMobsLevel2Stage");
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            sessionStorage.setItem("stageDisplayed", false);
                            document.getElementById("mobs").innerText = `0/3`;
                        }, 2000);
                    }, 500);
                }



                firstMobs = 1;
                MobsAmount = 3;

                if (!dataCleared) {
                    sessionStorage.removeItem("collectionPlayer");
                    sessionStorage.removeItem("defeatedMobsLevel2Stage");
                    dataCleared = true;
                    sessionStorage.setItem("dataCleared", true);
                }
            }

            if (document.getElementById("stage").innerText === "3/4") {
                if (defeatedMobsLvl2 !== null) {
                    document.getElementById("mobs").innerText = `${defeatedMobsLvl2.length}/3`
                }

                if (document.getElementById("mobs").innerText === "3/3" && !stageDisplayed) {
                    stageDisplayed = true;
                    // let data = JSON.parse(localStorage.getItem("allMobs"));
                    // localStorage.setItem("allMobs", JSON.stringify([...data, ...defeatedMobsLvl2]));
                    document.getElementById("stage").innerText = "4/4";
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `4`;
                    sessionStorage.removeItem("defeatedMobsLevel2Stage");

                    setTimeout(() => {
                        resetSessionStorage();
                        sessionStorage.removeItem("defeatedMobsLevel2Stage");
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            sessionStorage.setItem("stageDisplayed", false);
                            document.getElementById("mobs").innerText = `0/3`;
                        }, 2000);
                    }, 500);

                }

                firstAmount = 3;
                MobsAmount = 6;

                if (!dataCleared) {
                    sessionStorage.removeItem("collectionPlayer");
                    sessionStorage.removeItem("defeatedMobsLevel2Stage");
                    dataCleared = true;
                    sessionStorage.setItem("dataCleared", true);
                }
            }

            if (document.getElementById("stage").innerText === "4/4") {
                console.log("stage 4");
                if (defeatedMobsLvl2 !== null) {
                    document.getElementById("mobs").innerText = `${defeatedMobsLvl2.length}/3`
                }

                if (document.getElementById("mobs").innerText === "3/3" && !stageDisplayed) {
                    stageDisplayed = true;
                    // let data = JSON.parse(localStorage.getItem("allMobs"));
                    // localStorage.setItem("allMobs", JSON.stringify([...data, ...defeatedMobsLvl2]));
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `Completed`;
                    sessionStorage.removeItem("defeatedMobsLevel2Stage");

                    setTimeout(() => {
                        resetSessionStorage();
                        sessionStorage.removeItem("defeatedMobsLevel2Stage");
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            sessionStorage.setItem("stageDisplayed", false);
                            sessionStorage.setItem("levelCompleted", true);
                            document.getElementById("mobs").innerText = `0/3`;
                        }, 2000);
                    }, 500);
                }


                firstAmount = 6;
                MobsAmount = 9;

                if (!dataCleared) {
                    sessionStorage.removeItem("collectionPlayer");
                    sessionStorage.removeItem("defeatedMobsLevel2Stage");
                    dataCleared = true;
                    sessionStorage.setItem("dataCleared", true);
                }
            }

            if (isFinish === true && document.getElementById("stage").innerText === "4/4") {
                firstMobs = 0;
                MobsAmount = 0;
                window.location.href = "/src/pages/missionSuccess.html"
            }

            break;
        case "level_3":
            sessionStorage.setItem("levelCompleted", false);

            if (document.getElementById("stage").innerText === "1/4") {
                if (defeatedMobsLvl3 !== null) {
                    document.getElementById("mobs").innerText = `${defeatedMobsLvl3.length}/1`
                }
                if (document.getElementById("mobs").innerText === "1/1") {
                    document.getElementById("stage").innerText = "2/4";
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `2`;
                    sessionStorage.removeItem("defeatedMobsLevel3Stage");
                    setTimeout(() => {
                        resetSessionStorage();
                        sessionStorage.removeItem("defeatedMobsLevel3Stage");
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            sessionStorage.setItem("stageDisplayed", false);
                            document.getElementById("mobs").innerText = `0/2`;
                        }, 2000);
                    }, 500);
                }
            }

            if (document.getElementById("stage").innerText === "2/4") {
                if (defeatedMobsLvl3 !== null) {
                    document.getElementById("mobs").innerText = `${defeatedMobsLvl3.length}/2`
                }

                if (document.getElementById("mobs").innerText === "2/2") {
                    document.getElementById("stage").innerText = "3/4";
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `3`;
                    sessionStorage.removeItem("defeatedMobsLevel3Stage");
                    setTimeout(() => {
                        resetSessionStorage();
                        sessionStorage.removeItem("defeatedMobsLevel3Stage");
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            sessionStorage.setItem("stageDisplayed", false);
                            document.getElementById("mobs").innerText = `0/3`;
                        }, 2000);
                    }, 500);
                }
            }

            if (document.getElementById("stage").innerText === "3/4") {
                if (defeatedMobsLvl3 !== null) {
                    document.getElementById("mobs").innerText = `${defeatedMobsLvl3.length}/3`
                }
                if (document.getElementById("mobs").innerText === "3/3") {
                    document.getElementById("stage").innerText = "4/4";
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `4`;
                    sessionStorage.removeItem("defeatedMobsLevel3Stage");
                    setTimeout(() => {
                        resetSessionStorage();
                        sessionStorage.removeItem("defeatedMobsLevel3Stage");
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            sessionStorage.setItem("stageDisplayed", false);
                            document.getElementById("mobs").innerText = `0/4`;
                        }, 2000);
                    }, 500);
                }
            }

            if (document.getElementById("stage").innerText === "4/4") {
                sessionStorage.setItem("levelCompleted", false);
                if (defeatedMobsLvl3 !== null) {
                    document.getElementById("mobs").innerText = `${defeatedMobsLvl3.length}/3`
                }
                if (document.getElementById("mobs").innerText === "3/3") {
                    document.getElementById("stage").innerText = "4/4";
                    let stageText = document.getElementById("stageText");
                    document.getElementById("state_stage").innerText = `Completed`;
                    sessionStorage.removeItem("defeatedMobsLevel3Stage");
                    setTimeout(() => {
                        resetSessionStorage();
                        sessionStorage.removeItem("defeatedMobsLevel3Stage");
                        stageText.classList.add("show");
                        stageText.classList.remove("hide");
                        setTimeout(() => {
                            stageText.classList.remove("show");
                            stageText.classList.add("hide");
                            sessionStorage.setItem("stageDisplayed", false);
                            sessionStorage.setItem("levelCompleted", true);
                            document.getElementById("mobs").innerText = `4/4`;
                        }, 2000);
                    }, 500);
                }

            }
            if (isFinish === true && document.getElementById("stage").innerText === "4/4") {
                firstMobs = 0;
                MobsAmount = 0;
                window.location.href = "/src/pages/missionSuccess.html"
            }


            break;
        default:
            console.log("Level not found");
    }

    sessionStorage.setItem("stageDisplayed", stageDisplayed);

    return {
        ItemAmount,
        firstAmount,
        firstMobs,
        MobsAmount
    };
};