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

    move(input, boundaries = [], image, level) {
        let newX = this.x;
        let newY = this.y;

       
        console.log(window.innerHeight - 610);


        switch (level) {
            case "level_1":
                if (newY > window.innerHeight - 168) {
                    newY = window.innerHeight -168
                } else if ( newY < window.innerHeight - 668) {
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

        if (!this.collidesWithBoundaries(newX, newY, boundaries)) {
            this.x = newX;
            this.y = newY;
        }

        return {y: newY, x: newX}
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