import {
    collision
} from "./collision.mjs";

export class Mob {
    constructor(x, y, width, height, type, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type
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

    }

}

    