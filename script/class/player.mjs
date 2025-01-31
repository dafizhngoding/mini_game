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

    move(input, boundaries = [], image) {
        
        let newX = this.x;
        let newY = this.y;

        if (input.keys.w) newY -= this.speed;
        if (input.keys.s) newY += this.speed;
        if (input.keys.a) newX -= this.speed;
        if (input.keys.d) newX += this.speed;

        if (!this.collidesWithBoundaries(newX, newY, boundaries)) {
            this.x = newX;
            this.y = newY;
        }
    }

    collidesWithBoundaries(newX, newY, boundaries) {
        return boundaries.some(boundary => (
            newX < boundary.x + boundary.width &&
            newX + this.width > boundary.x &&
            newY < boundary.y + boundary.height &&
            newY + this.height > boundary.y
        ));
    }

    draw(ctx) {
        const playerImage = new Image();
        playerImage.src = this.image;
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }
}