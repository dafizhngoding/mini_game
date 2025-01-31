export class LevelManager {
    constructor() {
        this.levels = [];
        this.currentLevelIndex = 0;
    }

    addLevel(level) {
        this.levels.push(level);
        
    }

    loadLevel(index) {
        if (index >= 0 && index < this.levels.length) {
            this.currentLevelIndex = index;
            return this.levels[index];
        }
        return null;
    }

    nextLevel() {
        if (this.currentLevelIndex + 1 < this.levels.length) {
            return this.loadLevel(this.currentLevelIndex + 1);
        }
        return null;
    }
}
