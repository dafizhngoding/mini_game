class Camera {
    constructor(x, y, width, height) {
        this.position = {
            x,
            y
        }; // Posisi kamera
        this.width = width; // Lebar layar
        this.height = height; // Tinggi layar
    }

    // Memperbarui posisi kamera untuk mengikuti pemain
    follow(player) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        this.position.x = player.x - halfWidth;
        this.position.y = player.y - halfHeight;

        // Membatasi posisi kamera agar tidak keluar dari batas map
        this.position.x = Math.max(0, Math.min(this.position.x, mapWidth - this.width));
        this.position.y = Math.max(0, Math.min(this.position.y, mapHeight - this.height));
    }

    // Menghitung posisi objek relatif terhadap kamera
    getTransformedPosition(obj) {
        return {
            x: obj.x - this.position.x,
            y: obj.y - this.position.y
        };
    }
}