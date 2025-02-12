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
this.imageSrc = image;
this.zIndex = 2;
        this.facingLeft = false;


    }


    setCollision(player, ctx) {
        const coll = new collision(player.x + 50, player.y + 40, player.width - 100, player.height - 70)
        return coll.draw(ctx);
    }

    move(input, boundaries = [], image, level, mobs) {
        let newX = this.x;
        let newY = this.y;

        console.log(newY);
        console.log(window.innerHeight);
        console.log(window.innerWidth);
        console.log(newX);
        switch (level) {
            case "level_1":
                if (newY > window.innerHeight - 166) {
                    newY = window.innerHeight -166
                } else if (newY < window.innerHeight - 668) {
                    newY = window.innerHeight - 668
                }
                console.log("ok");

                if (newX < -50) {
                    newX = -50
                } else if (newX > window.innerWidth - 146)  {
                    newX = window.innerWidth - 146
                }
                break;
            case "level_2":
                if (newY > window.innerHeight - 278) {
                    newY = window.innerHeight - 278
                } else if (newY < window.innerHeight - 654) {
                    newY = window.innerHeight - 654
                }
                if (newX > window.innerWidth - 124) {

                }
        }
        if (input.keys.w) {
            this.imageSrc = "/assets/Main Character/Hero 1/Berlari.gif";
            newY -= this.speed
    };
        if (input.keys.s) {
            this.imageSrc = "/assets/Main Character/Hero 1/Berlari.gif";
            newY += this.speed
        }
        ;
        if (input.keys.a) {
            this.imageSrc = "/assets/Main Character/Hero 1/Berlari.gif"
            this.facingLeft = true;
            newX -= this.speed
        };
        if (input.keys.d) {
                        this.imageSrc = "/assets/Main Character/Hero 1/Berlari.gif"

            this.facingLeft = false;
            newX += this.speed
        };



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
                let score = JSON.parse(sessionStorage.getItem("score")) || 0
                if (!score) {
                    
                    sessionStorage.setItem("score", JSON.stringify(100))
                    document.getElementById("score").innerText = `${score || 0}`
                } else {
                    sessionStorage.setItem("score", JSON.stringify(score + 100));
                                        document.getElementById("score").innerText = `${score + 100 || 0}`

                }
                removeItems(item.items?.id);
                // console.log(removeItems(item.items?.id));
            } else {}

            // Filter ulang untuk pastikan tidak ada item null
            collectionSession = collectionSession.filter(itm => itm !== null && itm !== undefined);

            // Hapus duplikat berdasarkan ID
            collectionSession = [...new Map(collectionSession.map(itm => [itm?.id, itm])).values()];

            // Simpan koleksi ke sessionStorage
            sessionStorage.setItem("collectionPlayer", JSON.stringify(collectionSession));
        }
    }
    attackMobs(input, mob, level) {
        if (input.keys.e) {
            this.image = "/assets/Main Character/Hero 1/Menebas.gif";
            // Cek apakah mobs ada di jarak serang
            let dx = mob?.x - this.x;
            let dy = mob?.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (mob?.name === "ogre") {
                if (distance < 180) { // Jarak serang 80px
                    mob.takeDamage(level); // Kurangi HP mobs sebesar 50%

                } else {
                }
            } else if (mob?.name === "ogre") {
                 if (distance < 120) { // Jarak serang 80px
                     mob.takeDamage(level); // Kurangi HP mobs sebesar 50%

                 } else {
                 }
            } else {
                if (distance < 80) { // Jarak serang 80px
                    mob.takeDamage(level); // Kurangi HP mobs sebesar 50%
                   
                } else {
                }
            }
        } else {
            this.image = "/assets/Main Character/Hero 1/Berlari.gif"; // Animasi default saat tidak menyerang
        }
    }


    resetPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }


    draw(ctx) {
        const playerImage = new Image();
        playerImage.src = this.imageSrc;
    ctx.save()
    if (this.facingLeft === true) {
        ctx.scale(-1, 1); // Balik horizontal
        ctx.drawImage(playerImage, -this.x - this.width, this.y, this.width, this.height); // Gambar GIF di canvas
    } else {
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height); // Gambar GIF di canvas
    }
    ctx.restore(); // Kembalikan state canvas setelah flip
}
}