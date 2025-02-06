import {
    collision
} from "./collision.mjs";

export class Mob {
    constructor(x, y, width, height, type, image, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type,
            this.name = name
        this.image = image;
        this.speed = 1;
    }

    setCollision(mobs, ctx) {
        const coll = new collision(mobs.x + 47, mobs.y + 47, mobs.width - 105, mobs.height - 70);
        return coll.draw(ctx);
    }

    draw(ctx) {
        const MobsImage = new Image();
        MobsImage.src = this.image;
        ctx.drawImage(MobsImage, this.x, this.y, this.width, this.height);
    }

    followPlayer(player, mobs) {
        let dx = player.x - this.x;
        let dy = player.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy); // Hitung jarak mobs ke player




        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;

        // 🔥 Cegah mobs agar tidak bertumpuk ke player
        if (distance > this.width) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        } else {
            // 🔥 Jika terlalu dekat dengan player, mundur sedikit
            let angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 0.3;
            this.y -= Math.sin(angle) * 0.3;
        }

        // 🔥 Cegah mobs agar tidak bertumpuk dengan mobs lain
        for (let mob of mobs) {
            if (mob !== this) {
                let dxM = mob.x - this.x;
                let dyM = mob.y - this.y;
                let distanceM = Math.sqrt(dxM * dxM + dyM * dyM);

                if (distanceM < this.width) { // Jika mobs terlalu dekat satu sama lain
                    let angle = Math.atan2(dyM, dxM);
                    this.x -= Math.cos(angle) * 0.3; // Geser sedikit agar tidak menumpuk
                    this.y -= Math.sin(angle) * 0.3;
                }
            }
        }

    }

}