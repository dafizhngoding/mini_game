export class InputHandler {
    constructor() {
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            e: false
        };

        document.addEventListener("keydown", (event) => {
            if (this.keys.hasOwnProperty(event.key)) {
                this.keys[event.key] = true;
            }
        });

        document.addEventListener("keyup", (event) => {
            if (this.keys.hasOwnProperty(event.key)) {
                this.keys[event.key] = false;
            }
        });

    }
    showClickedButton() {
        if (this.keys.e == true) {
            console.log("button e clicked");
        }
    }
}