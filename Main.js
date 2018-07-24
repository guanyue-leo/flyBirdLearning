import ResourceLoader from "./js/base/ResourceLoader.js";

class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        const loader = ResourceLoader.creat();
        loader.onLoaded(map => this.onResourceFirstLoaded(map))
    }
    onResourceFirstLoaded(map) {
        console.log(map)
    }
}
export default Main