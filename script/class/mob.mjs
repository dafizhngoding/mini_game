import {
    removeMobsLvl
} from "../helper/removeHandler.mjs";
import {
    removeMobs
} from "../levels/level_2.mjs";
import {
    collision
} from "./collision.mjs";

export class Mob {
    constructor(x, y, width, height, type, image, name, id, hp = 100, maxHp = 100, speed = 2) {
        this.x = x;
        this.id = id
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type,
            this.name = name
        this.image = image;
        this.maxHp = maxHp; // HP maksimal
        this.hp = hp; // HP saat ini
        this.isAlive = true
        this.speed = speed;
        this.facingLeft = false;
        this.state = "moving";
        this.attackCooldown = false;
        this.attackInterval = null;
        this.firstAttack = true;

    }

    setCollision(mobs, ctx) {
        const coll = new collision(mobs.x + 47, mobs.y + 47, mobs.width - 105, mobs.height - 70);
        return coll.draw(ctx);
    }

    draw(ctx) {
        const MobsImage = new Image();
        MobsImage.src = this.image;

        ctx.save(); // Simpan state canvas sebelum flip

        if (this.facingLeft) {
            // 🔥 Flip gambar ke kiri
            ctx.translate(this.x + this.width, this.y);
            ctx.scale(-1, 1); // Balik horizontal
            ctx.drawImage(MobsImage, 0, 0, this.width, this.height);
        } else {
            // 🔥 Normal (menghadap kanan)
            ctx.drawImage(MobsImage, this.x, this.y, this.width, this.height);
        }

        ctx.restore(); // Kembalikan state canvas setelah flip

        // 🔥 HP Bar
        const barWidth = this.width * 0.8;
        const barHeight = 5;
        const barX = this.x + (this.width - barWidth) / 2;
        const barY = this.y - 10;

        ctx.fillStyle = "red"; // Warna background HP bar
        ctx.fillRect(barX, barY, barWidth, barHeight);

        const hpPercentage = this.hp / this.maxHp;
        ctx.fillStyle = "green"; // Warna HP yang tersisa
        ctx.fillRect(barX, barY, barWidth * hpPercentage, barHeight);

        ctx.strokeStyle = "black"; // Garis pinggir HP bar
        ctx.strokeRect(barX, barY, barWidth, barHeight);
    }

    followPlayer(player) {
        let dx = player.x - this.x;
        let dy = player.y - this.y;


        let distance = Math.sqrt(dx * dx + dy * dy); // Hitung jarak mobs ke player
        this.facingLeft = dx < 0;
        let attackRange; // Jarak untuk mulai menyerang
        if (this.name === "ogre") {
            attackRange = this.width - 270
        } else if (this.name === "orc") {
            attackRange = this.width - 270
        } else {
            attackRange = this.width - 120
        }
        const chaseRange = attackRange + 100; // 🔥 Cegah mobs agar tidak bertumpuk ke player
        if (distance <= attackRange) {
            if (this.state !== "attacking") {
                this.state = "attacking";

                if (this.attackInterval) {
                    clearInterval(this.attackInterval);
                }
              

                // 🔥 Serangan pertama langsung terjadi tanpa delay
                this.attack();
                this.firstAttack = false; // Setelah serangan pertama, atur ke false

                // 🔥 Loop serangan setiap 1 detik setelah serangan pertama
                this.attackInterval = setInterval(() => {
                    this.attack();
                }, 2000);
            }
            return {
                attack: !this.attackCooldown
            }; // Kembalikan status serangan sesuai cooldown

        } else if (distance <= chaseRange) {

            if (this.attackInterval) {
                clearInterval(this.attackInterval);
                this.attackInterval = null;
            }
            // 🔥 Mobs terus mengejar player dengan agresif
            if (this.state !== "moving") {
                this.state = "moving";
                if (this.name === "ogre") {
                    this.image = "/assets/Mobs/Ogre/Berlari.gif"
                } else if (this.name === "orc") {
                    this.image = "/assets/Mobs/Orc/Berlari.gif"

                } else {

                    this.image = "/assets/Mobs/Goblin/Berlari.gif";
                }
            }

            this.speed = 2; // Bisa sedikit lebih cepat saat mengejar
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;

            return {
                attack: false
            };

        } else {
            // 🔥 Kembali ke idle jika player menjauh terlalu jauh
            if (this.state !== "idle") {
                this.state = "idle";
                if (this.name === "ogre") {
                    this.image = "/assets/Mobs/Ogre/Bernafas.gif"
                } else if (this.name === "orc") {
                    this.image = "/assets/Mobs/Orc/Bernafas.gif"

                } else {

                    this.image = "/assets/Mobs/Goblin/Bernafas.gif";
                }
            }
            return {
                attack: false
            };
        }

    }

    attack() {
        if (!this.attackCooldown) {
            this.setImage("Menebas");
            this.attackCooldown = true;

            setTimeout(() => {
                this.setImage("Bernafas");
                this.attackCooldown = false;
            }, 1000); // 🔥 Bernafas setelah 500ms serangan
        }
    }

    setImage(action) {
        if (this.name === "ogre") {
            this.image = `/assets/Mobs/Ogre/${action}.gif`;
        } else if (this.name === "orc") {
            this.image = `/assets/Mobs/Orc/${action}.gif`;
        } else {
            this.image = `/assets/Mobs/Goblin/${action}.gif`;
        }
    }
    takeDamage(level) {
        this.hp -= 5;
        if (this.hp <= 0) {
            this.hp = 0;
            this.isAlive = false;

            // Simpan mobs yang sudah mati ke sessionStorage
            const key = level === "level_2" ? "defeatedMobsLevel2" : "defeatedMobsLevel3";
            const stageKey = level === "level_2" ? "defeatedMobsLevel2Stage" : "defeatedMobsLevel3Stage";
            console.log(stageKey);
            let mobs = JSON.parse(sessionStorage.getItem(key)) || [];
            let mobStage = JSON.parse(sessionStorage.getItem(stageKey)) || [];

            mobs.push({
                id: this.id,
                name: this.name
            });
            mobStage.push({
                id: this.id,
                name: this.name
            });

            // Hilangkan duplikat berdasarkan ID
            let uniqueMobs = [...new Map(mobs.map(m => [m.id, m])).values()];
            let uniqueMobsStage = [...new Map(mobStage.map(m => [m.id, m])).values()];

            // Simpan kembali ke sessionStorage
            sessionStorage.setItem(key, JSON.stringify(uniqueMobs));
            sessionStorage.setItem(stageKey, JSON.stringify(uniqueMobsStage));

            // Hapus mobs dari level yang sesuai
            removeMobs(this.id, )
        }

        console.log(`HP ${this.name}: ${this.hp}/${this.maxHp}`);
    }

}