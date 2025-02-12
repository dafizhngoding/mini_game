import { Mob } from "../class/mob.mjs";
import {
    dataMobsLvl2
} from "../levels/level_2.mjs";
// import { CreateLevel_3 } from "../levels/level_3.mjs";


 

export function removeMobsLvl(itemId, level) {
    let targetMobs;

    if (level === "level_2") {
        targetMobs = dataMobsLvl2;
    } else if (level === "level_3") {
        targetMobs = dataMobsLvl2;
    } else {
        return null;
    }

    const index = targetMobs.findIndex(item => item?.id === itemId);
    if (index !== -1) {
        const removedMob = targetMobs.splice(index, 1);
        targetMobs.splice(index, 1)// Hapus item dari array
        return removedMob; // Mengembalikan mob yang dihapus
    }

    return null;
}

export function removeTakenMobsLvl(level) {
    let targetMobs, sessionKey;

    if (level === "level_2") {
        targetMobs = dataMobsLvl2;
        sessionKey = "defeatedMobsLevel2";
    } else if (level === "level_3") {
        targetMobs = dataMobsLvl2;
        sessionKey = "defeatedMobsLevel3";
    } else {
        return null;
    }

    // Ambil mobs yang sudah dikalahkan dari sessionStorage
    let takenMobs = JSON.parse(sessionStorage.getItem(sessionKey)) || [];
    takenMobs = takenMobs.filter(item => item !== null && item !== undefined);

    // Simpan kembali mobs yang valid ke sessionStorage
    sessionStorage.setItem(sessionKey, JSON.stringify(takenMobs));

    // Ambil ID dari mobs yang sudah dikalahkan
    const takenMobsIds = new Set(takenMobs.map(item => item?.id));

    // Hapus mobs yang sudah dikalahkan dari targetMobs
    for (let i = targetMobs.length - 1; i >= 0; i--) {
        if (takenMobsIds.has(targetMobs[i]?.id)) {
            targetMobs.splice(i, 1); // Hapus langsung dari array
        }
    }

    return targetMobs;
}
