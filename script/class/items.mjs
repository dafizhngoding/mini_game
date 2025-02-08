export class Item {
    constructor(x, y, width, height, id, name, type, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // this.color = color;
        this.id = id;
        this.name = name;
        this.type = type;
        this.zIndex = 1;
        this.image = image;
    }

   draw(ctx) {
       const ItemImage = new Image();
       ItemImage.src = this.image;
       ctx.drawImage(ItemImage, this.x, this.y, this.width, this.height);
   }
}
