import ResourceLoader from "./js/base/ResourceLoader.js";
import Director from "./js/Director.js";
import Background from "./js/runtime/Background.js";
import DataStore from "./js/base/DataStore.js";

class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        const loader = ResourceLoader.creat();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
        Director.getInstance();
    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {
        console.log('init');
        this.dataStore.put('background', Background);
        Director.getInstance().run();
    }
}
export default Main