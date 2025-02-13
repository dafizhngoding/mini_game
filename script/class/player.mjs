import {
    dataItemsLVL1,
    removeItems
} from "../../data/level_1.mjs";
import { itemsLvl3, removeItemsLvl3 } from "../levels/level_3.mjs";
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
        this.isDead = false; 
        this.gravity = 0;


    }
    dead(respawn = false) {
        if (!this.isDead) {
            this.isDead = true;
            this.imageSrc = "/assets/Main Character/Hero 1/dead.png"; // Animasi mati
        }

        const fallSpeed = 2; // 🔥 Jatuh lebih cepat
        const fallInterval = setInterval(() => {
            this.y += fallSpeed; // 🔥 Langsung jatuh ke bawah cepat

            if (this.y > window.innerHeight) { // 🔥 Jika keluar layar
                clearInterval(fallInterval);
                if (respawn) {
                    this.resetPosition(100, 100); // 🔥 Respawn ke posisi awal
                    this.isDead = false;
                    this.imageSrc = "/assets/Main Character/Hero 1/Bernafas.gif"; // 🔥 Kembali ke idle
                }
            }
        }, 1);

        // 🔥 Hapus dalam 1 detik
        setTimeout(() => {
            clearInterval(fallInterval);
        }, 2500);
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

        switch (level) {
            case "level_1":
                if (newY > window.innerHeight - 166) {
                    newY = window.innerHeight - 166
                } else if (newY < window.innerHeight - 668) {
                    newY = window.innerHeight - 668
                }
                if (newX < -50) {
                    newX = -50
                } else if (newX > window.innerWidth - 146) {
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
                break;
            case "level_3":
                console.log("ok");
                if (newY > window.innerHeight - 166) {
                    newY = window.innerHeight - 166
                } else if (newY < window.innerHeight - 812) {
                    newY = window.innerHeight - 812
                }

                if (newX < -50) {
                    newX = -50
                } else if (newX > window.innerWidth - 146) {
                    newX = window.innerWidth - 146
                }
                break;


        
        }
        if (input.keys.w) {
            if (this.isDead === true) {
                this.imageSrc = "/assets/Main Character/Hero 1/dead.png"
            } else {
                this.imageSrc = "/assets/Main Character/Hero 1/Berlari.gif";
                newY -= this.speed
            }
        };
        if (input.keys.s) {
            if (this.isDead === true) {
                this.imageSrc = "/assets/Main Character/Hero 1/dead.png"
            } else {
                let count = 1
                setInterval(() => {
                    console.log("jalan");
                    this.imageSrc =`/assets/Main Character/Hero 1/Running/Running/${count === 1 ? 1 : count + 1 > 12 ?12 : count + 1 }.png`;
                }, 73)
                this.imageSrc = "/assets/Main Character/Hero 1/Berlari.gif";
                newY += this.speed
            }
                
        };
        if (input.keys.a) {
            if (this.isDead === true) {
                this.imageSrc = "/assets/Main Character/Hero 1/dead.png"
            } else {
                this.imageSrc = "/assets/Main Character/Hero 1/Berlari.gif";
                this.facingLeft = true;
                newX -= this.speed
            }
        };
        if (input.keys.d) {
            if (this.isDead === true) {
                this.imageSrc = "/assets/Main Character/Hero 1/dead.png"
            }
            else {
                this.imageSrc = "/assets/Main Character/Hero 1/Berlari.gif";
    
                this.facingLeft = false;
                newX += this.speed
             }
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


        if (!item || !item.items) {
            return;
        }
        switch (level) {
            case "level_1":
                dataItems = dataItemsLVL1;
                break;
            case "level_3":
                dataItems = itemsLvl3;
                console.log(dataItems);
                break;
            default:
                return;
        }
        if (input.keys.f) {
            let collectionSession = JSON.parse(sessionStorage.getItem("collectionPlayer")) || [];
            const isDuplicate = collectionSession.some(itm => itm?.id === item.items?.id);
            

            if (!isDuplicate) {
                collectionSession.push(item.items);
                let score = JSON.parse(sessionStorage.getItem("score")) || 0
                if (!score) {

                    sessionStorage.setItem("score", JSON.stringify(100))
                    // document.getElementById("score").innerText = `${score || 0}`
                } else {
                    sessionStorage.setItem("score", JSON.stringify(score + 100));
                    // document.getElementById("score").innerText = `${score + 100 || 0}`

                }
                level === "level_1" ?removeItems(item.items?.id) : removeItemsLvl3(item.items?.id)             // console.log(removeItems(item.items?.id));
            } else {}

            collectionSession = collectionSession.filter(itm => itm !== null && itm !== undefined);

            collectionSession = [...new Map(collectionSession.map(itm => [itm?.id, itm])).values()];
console.log(collectionSession);
            sessionStorage.setItem("collectionPlayer", JSON.stringify(collectionSession));
        }
    }
    attackMobs(input, mob, level) {
        if (input.keys.e) {
            this.image = "/assets/Main Character/Hero 1/Menebas.gif";
            let dx = mob?.x - this.x;
            let dy = mob?.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (mob?.name === "ogre") {
                if (distance < 180) { 
                    mob.takeDamage(level); 

                } else {}
            } else if (mob?.name === "ogre") {
                if (distance < 120) { 
                    mob.takeDamage(level); 

                } else {}
            } else {
                if (distance < 80) { 
                    mob.takeDamage(level); 

                } else {}
            }
        } else {
            this.image = "/assets/Main Character/Hero 1/Berlari.gif";
        }
    }


    resetPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }


    draw(ctx, player = undefined || {}, mobs = undefined || {}, items = undefined || {}) {

        if (player.name === "player") {
            console.log("player");
        }
        const playerImage = new Image();
        playerImage.src = this.imageSrc;
        ctx.save()
        if (this.facingLeft === true) {

            if (player.name === "player") {
                ctx.fillStyle = "#0f1923";
                ctx.fillRect(this.x + this.width / 2.5, this.y, 36, 36);

                ctx.fillStyle = "white";
                ctx.font = "bold 20px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("E", (this.x + this.width / 2.5) + 36 / 2, this.y + 38 / 2);
            }

           

            ctx.scale(-1, 1); 
            ctx.drawImage(playerImage, -this.x - this.width, this.y, this.width, this.height);
        } else {
            ctx.drawImage(playerImage, this.x, this.y, this.width, this.height); // Gambar GIF di canvas
            if (player.name === "player") {
                ctx.fillStyle = "#0f1923";
                ctx.fillRect(this.x + this.width / 2.5, this.y, 36, 36);

                ctx.fillStyle = "white";
                ctx.font = "bold 20px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("E", (this.x + this.width / 2.5) + 36 / 2, this.y + 38 / 2);

            }
            
        }

        ctx.restore(); 
    }
}