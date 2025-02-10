import {
    removeMobs
} from "../levels/level_2.mjs";
import {
    collision
} from "./collision.mjs";

export class Mob {
    constructor(x, y, width, height, type, image, name, id) {
        this.x = x;
        this.id = id
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type,
            this.name = name
        this.image = image;
        this.maxHp = 100; // HP maksimal
        this.hp = 100; // HP saat ini
        this.isAlive = true
        this.speed = 2;
        this.facingLeft = false;
        this.state = "moving";
        this.attackCooldown = false;

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

    followPlayer(player, mobs) {
        let dx = player.x - this.x;
        let dy = player.y - this.y;
        console.log(dx, dy);

        let distance = Math.sqrt(dx * dx + dy * dy); // Hitung jarak mobs ke player
        console.log(distance);
        this.facingLeft = dx < 0;

        const attackRange = this.width - 120; // Jarak untuk mulai menyerang
        const chaseRange = attackRange + 100; // 🔥 Cegah mobs agar tidak bertumpuk ke player
        if (distance <= attackRange) {
            if (this.state !== "attacking") {
                this.state = "attacking";
                this.image = "/assets/Mobs/Goblin/Menebas.gif";
                console.log("Mobs langsung menyerang!");

                // 🔥 Tambahkan cooldown biar serangan tidak terlalu cepat bertubi-tubi
                if (!this.attackCooldown) {
                    this.attackCooldown = true;
                    setTimeout(() => {
                        this.attackCooldown = false;
                    }, 500); // Cooldown 0.5 detik antara serangan
                }
            }
            return {
                attack: !this.attackCooldown
            }; // Kembalikan status serangan sesuai cooldown

        } else if (distance <= chaseRange) {
            // 🔥 Mobs terus mengejar player dengan agresif
            if (this.state !== "moving") {
                this.state = "moving";
                this.image = "/assets/Mobs/Goblin/Berlari.gif";
                console.log("Mobs mengejar player!");
            }

            this.speed = 1; // Bisa sedikit lebih cepat saat mengejar
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;

            return {
                attack: false
            };

        } else {
            // 🔥 Kembali ke idle jika player menjauh terlalu jauh
            if (this.state !== "idle") {
                this.state = "idle";
                this.image = "/assets/Mobs/Goblin/bernafas.gif"; // Pastikan ada gambar idle
                console.log("Mobs kembali ke posisi idle");
            }
            return {
                attack: false
            };
        }
        // 🔥 Cegah mobs bertumpuk dengan mobs lain
        //    for (let mob of mobs) {
        //        if (mob !== this) {
        //            let dxM = mob.x - this.x;
        //            let dyM = mob.y - this.y;
        //            let distanceM = Math.sqrt(dxM * dxM + dyM * dyM);

        //            if (distanceM < this.width) {
        //                let angle = Math.atan2(dyM, dxM);
        //                this.x -= Math.cos(angle) * 0.3;
        //                this.y -= Math.sin(angle) * 0.3;
        //            }
        //        }
        //    }

    }
    takeDamage() {
        // if (this.isAlive) {
        //     // Kurangi HP sebesar 50%
        //     this.hp -= this;

        //     // Pastikan HP tidak negatif
        //     if (this.hp <= 0) this.hp = 0;

        //     // Cek apakah mobs sudah mati
        //     if (this.hp === 0) {
        //         this.isAlive = false;
        //         this.image = "/assets/Mobs/Goblin/Mati.gif"; // Ganti gambar mobs mati (sesuaikan dengan filemu)
        //         console.log(`${this.name} telah dikalahkan!`);
        //         this.removeFromLevel();
        //     } else {
        //         console.log(`${this.name} terkena serangan! HP tersisa: ${this.hp}/${this.maxHp}`);
        //     }
        // }


        this.hp -= 5
        if (this.hp <= 0) {
            this.hp = 0
        }
        if (this.hp === 0) {
            this.isAlive = false;
            console.log("hp mobs habis");
            const mobs = JSON.parse(sessionStorage.getItem("defeatedMobsLevel2")) || [];
            const mobStage = JSON.parse(sessionStorage.getItem("defeatedMobsLevel2Stage")) || [];
            mobs.push({id:this.id, name:this.name});
            mobStage.push({id:this.id, name:this.name});
            let uniqueMobs = [...new Map(mobs.map(m => [m.id, m])).values()]
            let uniqueMobsStage = [...new Map(mobStage.map(m => [m.id, m])).values()]
            sessionStorage.setItem("defeatedMobsLevel2", JSON.stringify(uniqueMobs));
            sessionStorage.setItem("defeatedMobsLevel2Stage", JSON.stringify(uniqueMobsStage));
            removeMobs(this?.id)
        }
        console.log("hp", this.hp);
    }
    // removeFromLevel() {
    //     // Ambil data mobs yang sudah mati dari sessionStorage
    //     const defeatedMobs = JSON.parse(sessionStorage.getItem("defeatedMobsLevel2")) || [];

    //     // Tambahkan mobs yang sudah mati ke sessionStorage
    //     defeatedMobs.push(this.id);
    //     sessionStorage.setItem("defeatedMobsLevel2", JSON.stringify(defeatedMobs));

    //     // Hapus mobs dari currentLevel.Mobs
    //     const levelMobs = currentLevel.Mobs;
    //     const index = levelMobs.findIndex(mob => mob.id === this.id);
    //     if (index !== -1) {
    //         levelMobs.splice(index, 1); // Hapus mobs dari array
    //     }
    // }

}