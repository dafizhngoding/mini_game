import {
    dataItemsLVL1
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
    }

    setCollision(player, ctx) {
        const coll = new collision(player.x + 50, player.y + 40, player.width - 100, player.height - 70)
        return coll.draw(ctx);
    }

    move(input, boundaries = [], image, level, mobs) {
        let newX = this.x;
        let newY = this.y;


        console.log(window.innerHeight - 610);


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

    collectItems(item = {}, level, input) {
        let dataItems;

        if (item === undefined) {
            console.log("no item detected");
            return;
        }

        switch (level) {
            case "level_1":
                dataItems = dataItemsLVL1;
                break;
            default:
                console.log("Level tidak ditemukan");
                return;
        }

        const itemsFilter = dataItems.find(itm => itm.id === item.items?.id);
        console.log("filter", itemsFilter);

        if (input.keys.f) {
            let collectionSession = JSON.parse(sessionStorage.getItem("collectionPlayer")) || [];

            if (!itemsFilter) {
                console.log("Item tidak ditemukan dalam dataItems");
                return;
            }

            const isDuplicate = collectionSession.some(itm => itm.id === itemsFilter.id);

            if (!isDuplicate) {
                collectionSession.push(itemsFilter);
                console.log("Item baru ditambahkan:", itemsFilter);
            } else {
                console.log("Item sudah ada, tidak ditambahkan:", itemsFilter);
            }

            collectionSession = [...new Map(collectionSession.map(itm => [itm.id, itm])).values()];

            sessionStorage.setItem("collectionPlayer", JSON.stringify(collectionSession));

            console.log("Collection disimpan:", collectionSession);
        }
    }




    draw(ctx) {
        const playerImage = new Image();
        playerImage.src = this.image;
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }
}