import ResourceLoader from "./js/base/ResourceLoader.js";
import Director from "./js/Director.js";
import Background from "./js/runtime/Background.js";
import DataStore from "./js/base/DataStore.js";
import Land from "./js/runtime/Land.js";
import Birds from "./js/player/Birds.js";

class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.creat();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
        Director.getInstance();
    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.canvas = this.canvas;
        this.dataStore.res = map;
        this.init();
    }

    init() {
        this.director.isGameOver = false;
        console.log('init');
        this.dataStore
            .put('pencils', [])
            .put('background', Background)
            .put('birds', Birds)
            .put('land', Land);
        this.registerEvent();
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener('touchstart', e=>{
            e.preventDefault();
            console.log('touch');
            if(this.director.isGameOver){
                this.init();
            }else{
                this.director.birdsEvent();
            }
        })
    }
}
export default Main