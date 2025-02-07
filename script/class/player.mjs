import {
    dataItemsLVL1,
    removeItems
} from "../../data/level_1.mjs";
import {
    collision
} from "./collision.mjs";

export class Player {
    constructor(x, y, width, height, name, speed, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.speed = speed;
        this.image = image;
        this.zIndex = 2;
    }

    setCollision(player, ctx) {
        const coll = new collision(player.x + 50, player.y + 40, player.width - 100, player.height - 70)
        return coll.draw(ctx);
    }

    move(input, boundaries = [], image, level, mobs) {
        let newX = this.x;
        let newY = this.y;


        // console.log(window.innerHeight - 610);


        switch (level) {
            case "level_1":
                if (newY > window.innerHeight - 168) {
                    newY = window.innerHeight - 168
                } else if (newY < window.innerHeight - 668) {
                    newY = window.innerHeight - 668
                }

                if (newX < -50) {
                    newX = -50
                }
        }
        if (input.keys.w) newY -= this.speed;
        if (input.keys.s) newY += this.speed;
        if (input.keys.a) newX -= this.speed;
        if (input.keys.d) newX += this.speed;



        this.y = newY
        this.x = newX

        return {
            y: newY,
            x: newX
        }
    }

collectItems(item = {}, level, input, items = []) {
    let dataItems;
    

    // Cek apakah item terdeteksi
   if (!item || !item.items) {
       return;
   }

    // Tentukan dataItems berdasarkan level
    switch (level) {
        case "level_1":
            dataItems = dataItemsLVL1;
            break;
        default:
            return;
    }
    // Proses pengumpulan item jika tombol 'f' ditekan
    if (input.keys.f) {
        let collectionSession = JSON.parse(sessionStorage.getItem("collectionPlayer")) || [];
        // Cek apakah item sudah ada di sessionStorage
        const isDuplicate = collectionSession.some(itm => itm?.id === item.items?.id);

        if (!isDuplicate) {
                collectionSession.push(item.items);
            removeItems(item.items?.id);
            console.log(removeItems(item.items?.id));
        } else {
        }

        // Filter ulang untuk pastikan tidak ada item null
        collectionSession = collectionSession.filter(itm => itm !== null && itm !== undefined);

        // Hapus duplikat berdasarkan ID
        collectionSession = [...new Map(collectionSession.map(itm => [itm?.id, itm])).values()];

        // Simpan koleksi ke sessionStorage
        sessionStorage.setItem("collectionPlayer", JSON.stringify(collectionSession));
    }
}

 resetPosition(newX, newY) {
     this.x = newX;
     this.y = newY;
 }


    draw(ctx) {
        const playerImage = new Image();
        playerImage.src = this.image;
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }
}