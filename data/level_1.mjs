import { Item } from "../script/class/items.mjs"
const x = window.innerWidth;
const y = window.innerHeight - 168;

export let dataItemsLVL1 = [
    new Item( x- 250,600 > y ? y  + 100 : 600, 50,50, 1, "trash", "item add score" , "/assets/Items/1.png"),
    new Item( x- 346,324 > y ? y + 100 : 324, 50,50, 2, "trash", "item add score" , "/assets/Items/2.png"),
    new Item( x- 453,234 > y ? y + 100 : 234, 50,50, 3, "trash", "item add score", "/assets/Items/3.png" ),
    new Item( x- 345,480 > y ? y + 100 : 480, 50,50, 4, "trash", "item add score", "/assets/Items/4.png" ),
    new Item( x- 100,600 > y ? y + 100 : 600, 50,50, 5, "trash", "item add score", "/assets/Items/5.png" ),
    new Item( x- 450,560 > y ? y + 100 : 560, 50,50, 6, "trash", "item add score", "/assets/Items/6.png" ),
    new Item( x - 900,400 > y ? y + 100 : 400, 50,50, 7, "trash", "item add score", "/assets/Items/6.png" ),
    new Item( x- 780,240 > y ? y + 100 : 240, 50,50, 8, "trash", "item add score", "/assets/Items/10.png" ),
    new Item(x -890,450 > y ? y + 100 : 450, 50,50, 9, "trash", "item add score", "/assets/Items/7.png" ),
    new Item( x - 999,290 > y ? y + 100 : 290, 50,50, 10, "trash", "item add score", "/assets/Items/5.png" ),
    new Item(x -1100,300 > y ? y + 100 : 300, 50,50, 11, "trash", "item add score", "/assets/Items/12.png" ),
    new Item(x -540,530 > y ? y + 100 : 530, 50,50, 12, "trash", "item add score", "/assets/Items/13.png" ),
    new Item(x-966,470 > y ? y + 100 : 470, 50,50, 13, "trash", "item add score", "/assets/Items/14.png" ),
    new Item(x -79,270 > y ? y + 100 : 270, 50,50, 14, "trash", "item add score", "/assets/Items/3.png" ),
    new Item(x -800,346 > y ? y + 100 : 346, 50,50, 15, "trash", "item add score", "/assets/Items/2.png" ),
    new Item(x -980,546 > y ? y + 100 : 546, 50,50, 16, "trash", "item add score", "/assets/Items/11.png" ),
    new Item(x -670,267 > y ? y + 100 : 267, 50,50, 17, "trash", "item add score", "/assets/Items/12.png" ),
    new Item(x -1000,240 > y ? y + 100 : 240, 50,50, 18, "trash", "item add score", "/assets/Items/7.png" ),
    new Item(x -1200,321 > y ? y + 100 : 321, 50,50, 19, "trash", "item add score", "/assets/Items/8.png" ),
    new Item(x -790,478 > y ? y + 100 : 478, 50,50, 20, "trash", "item add score", "/assets/Items/1.png" ),
    new Item(x -856,540 > y ? y + 100 : 540, 50,50, 21, "trash", "item add score", "/assets/Items/3.png" ),
    new Item(x -1200,498 > y ? y + 100 : 498, 50,50, 22, "trash", "item add score", "/assets/Items/8.png" ),
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