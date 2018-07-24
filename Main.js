import ResourceLoader from "./js/base/ResourceLoader.js";
import Director from "./js/Director.js";
import Background from "./js/runtime/Background.js";

class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const loader = ResourceLoader.creat();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
        Director.getInstance();
    }
    onResourceFirstLoaded(map) {
        let background = new Background(this.ctx, map.get('background'));
        background.draw()
    }
}
export default Main