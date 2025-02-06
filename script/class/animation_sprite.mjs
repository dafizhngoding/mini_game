class AnimatedSprite {
    constructor(imagePaths, animationSpeed) {
        this.frames = imagePaths.map(src => {
            let img = new Image();
            img.src = src;
            return img;
        });

        this.animationSpeed = animationSpeed; // Kecepatan animasi (ms per frame)
        this.currentFrame = 0;
        this.elapsedTime = 0;
        this.lastUpdate = performance.now();
    }

    update() {
        let now = performance.now();
        this.elapsedTime += now - this.lastUpdate;
        this.lastUpdate = now;

        if (this.elapsedTime > this.animationSpeed) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            this.elapsedTime = 0;
        }
    }

    draw(ctx, x, y, width, height) {
        ctx.drawImage(this.frames[this.currentFrame], x, y, width, height);
    }
}
