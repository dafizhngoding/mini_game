export class InputHandler {
    constructor() {
       const savedSettings = sessionStorage.getItem('gameSettings');
       const defaultSettings = {
           w: false,
           a: false,
           s: false,
           d: false,
           e: false,
           f: false,
        };
        
        this.keys = savedSettings ? JSON.parse(savedSettings) : defaultSettings;

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