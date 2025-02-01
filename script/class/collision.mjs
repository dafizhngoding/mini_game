    export class collision  { 
        constructor(x,y, width, height, type) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.type = type
        }

        draw(ctx) { 
            
            ctx.fillStyle = "transparent"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        isCollidingWith(other) {
            return (
                this.x < other.x + other.width &&
                this.x + this.width > other.x &&
                this.y < other.y + other.height &&
                this.y + this.height > other.y
            );
        }
        
    }