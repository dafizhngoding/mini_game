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

     draw(ctx) {
         const MobsImage = new Image();
        MobsImage.src = this.image;
         ctx.drawImage(MobsImage, this.x, this.y, this.width, this.height);
     }

    followPlayer(player, mobs) {
        let dx = player.x - this.x;
        let dy = player.y - this.y;

        console.log(dx, dy);
        let distance = Math.sqrt(dx * dx + dy * dy); // Hitung jarak mobs ke player

        console.log(distance);

        if (distance > 1) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }

        console.log(player);
        this.avoidCollision(mobs);
    }

     avoidCollision(mobs) {
         mobs.forEach(mob => {
             if (mob !== this) { // Jangan bandingkan dengan dirinya sendiri
                 let dx = mob.x - this.x - 30;
                 let dy = mob.y - this.y - 30;
                 let distance = Math.sqrt(dx * dx + dy * dy);

                 if (distance < this.width) { // Jika terlalu dekat, geser sedikit
                     let angle = Math.atan2(dy, dx);
                     this.x -= Math.cos(angle) * 0.5; // Geser menjauh dari mobs lain
                     this.y -= Math.sin(angle) * 0.5;
                 }
             }
         });
     }
}
