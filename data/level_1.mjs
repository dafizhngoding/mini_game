import { Item } from "../script/class/items.mjs"
const x = window.innerWidth;

export let dataItemsLVL1 = [
    new Item(250,600, 50,50, 1, "trash", "item add score" , "/assets/Items/1.png"),
    new Item(346,324, 50,50, 2, "trash", "item add score" , "/assets/Items/2.png"),
    new Item(453,234, 50,50, 3, "trash", "item add score", "/assets/Items/3.png" ),
    new Item(345,480, 50,50, 4, "trash", "item add score", "/assets/Items/4.png" ),
    new Item(100,600, 50,50, 5, "trash", "item add score", "/assets/Items/5.png" ),
    new Item(450,560, 50,50, 6, "trash", "item add score", "/assets/Items/6.png" ),
    new Item(900,400, 50,50, 7, "trash", "item add score", "/assets/Items/6.png" ),
    new Item(780,240, 50,50, 8, "trash", "item add score", "/assets/Items/10.png" ),
    new Item(200,450, 50,50, 9, "trash", "item add score", "/assets/Items/7.png" ),
    new Item(17,290, 50,50, 10, "trash", "item add score", "/assets/Items/5.png" ),
    new Item(x -145,300, 50,50, 11, "trash", "item add score", "/assets/Items/12.png" ),
    new Item(x -86,560, 50,50, 12, "trash", "item add score", "/assets/Items/13.png" ),
    new Item(x-44,460, 50,50, 13, "trash", "item add score", "/assets/Items/14.png" ),
    new Item(x -79,270, 50,50, 14, "trash", "item add score", "/assets/Items/3.png" ),
    new Item(x -100,640, 50,50, 15, "trash", "item add score", "/assets/Items/2.png" ),
    new Item(x -400,520, 50,50, 16, "trash", "item add score", "/assets/Items/6.png" ),
]


export function removeItems(itemId) {
    const index = dataItemsLVL1.findIndex(item => item?.id === itemId);
    if (index !== -1) {
        const filter = dataItemsLVL1.filter(item => item.id === itemId);
        dataItemsLVL1.splice(index, 1); // Hapus item dari array
        return filter
    }
}


export function removeTakenItems() {
    // Ambil item yang sudah dikoleksi dari sessionStorage
    let takenItems = JSON.parse(sessionStorage.getItem("collectionPlayer")) || [];

    // Filter untuk menghapus item yang bernilai null atau undefined
    takenItems = takenItems.filter(item => item !== null && item !== undefined);

    // Simpan kembali ke sessionStorage setelah menghapus item null
    sessionStorage.setItem("collectionPlayer", JSON.stringify(takenItems));

    // Ambil ID dari item yang sudah diambil
    const takenItemIds = takenItems.map(item => item?.id);
    // Hapus item yang sudah diambil dari dataItemsLVL1
    const filter = dataItemsLVL1.filter(item => !takenItemIds.includes(item?.id))
    dataItemsLVL1 = dataItemsLVL1.filter(item => !takenItemIds.includes(item?.id));
    return filter
}

export const generateItems = (config) => {
    
    const newItems = [];
    
    for (let i = 0; i < config.itemAmount; i++) {
        let y = Math.floor(Math.random() * (config.maxY - config.minY + 1)) + config.minY
        if (y > window.innerHeight - 168) { 
            y = window.innerHeight - 168
        } else if (y < window.innerHeight - 128) {
            y = window.innerHeight - 168
        } 
        
        let x = Math.floor(Math.random() * (config.maxX - config.minX + 1)) + config.minX
        if (x < -50) {
            x = -50
        } else if (x > window.innerWidth) {
            x = window.innerWidth - 50
        }
        const item = new Item(x,y, 50,50 , i + 5, "coin", "item add score", "/assets/items/gemYellow.png")
        newItems.push(item);
    }

    console.log("items added: " );

    dataItemsLVL1 = [...newItems]
}