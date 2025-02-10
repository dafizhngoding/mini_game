import {
    collision
} from "../class/collision.mjs";
import {
    Mob
} from "../class/mob.mjs";
import {
    Player
} from "../class/player.mjs";

export let CreateLevel_2 = () => {
    return {
        player: new Player(100, 124, 200, 200, "player", 2, '/assets/Main Character/Hero 1/Bernafas.gif'),
        Mobs: dataMobsLvl2,
        status: "ready",
        name: "level_2",
        collision: collision
    }
};

export let dataMobsLvl2 = [
    new Mob(window.innerWidth - 890, 450, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 1),
    new Mob(window.innerWidth - 780, 460, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 2),
    new Mob(window.innerWidth - 290, 240, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 3),
    new Mob(window.innerWidth - 980, 200, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 4),
    new Mob(window.innerWidth - 999, 300, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 5),
    new Mob(window.innerWidth - 1000, 560, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 6),
    new Mob(window.innerWidth - 768, 421, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 7),
    new Mob(window.innerWidth - 190, 367, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 8),
    new Mob(window.innerWidth - 1200, 398, 200, 200, "Mobs", '/assets/Mobs/Goblin/Bernafas.gif', 'goblin', 9),
]

export function removeMobs(itemId) {
    const index = dataMobsLvl2.findIndex(item => item?.id === itemId);
    if (index !== -1) {
        const filter = dataMobsLvl2.filter(item => item.id === itemId);
        dataMobsLvl2.splice(index, 1); // Hapus item dari array
        return filter
    }
}

export function removeTakenMobs() {
    // Ambil mobs yang sudah dikalahkan dari sessionStorage
    let takenMobs = JSON.parse(sessionStorage.getItem("defeatedMobsLevel2")) || [];

    // Filter untuk menghapus mobs yang bernilai null atau undefined
    takenMobs = takenMobs.filter(item => item !== null && item !== undefined);

    // Simpan kembali ke sessionStorage setelah menghapus mobs null
    sessionStorage.setItem("defeatedMobsLevel2", JSON.stringify(takenMobs));

    // Ambil ID dari mobs yang sudah dikalahkan
    const takenMobsIds = takenMobs.map(item => item?.id);

    // Hapus mobs yang sudah dikalahkan dari dataMobsLvl2
    dataMobsLvl2 = dataMobsLvl2.filter(item => !takenMobsIds.includes(item?.id));

    return dataMobsLvl2;
}