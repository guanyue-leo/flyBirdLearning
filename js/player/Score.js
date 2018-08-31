import DataStore from "../base/DataStore.js";

class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        this.isScore = true;
    }
    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(
            this.scoreNumber,
            window.innerWidth / 2, window.innerHeight / 18,
            1000
        );
        this.ctx.textAlign = 'center';
    }
}
export default Score