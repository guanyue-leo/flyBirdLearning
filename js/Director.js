import DataStore from "./base/DataStore.js";
import UpPencil from "./runtime/UpPencil.js";
import DownPencil from "./runtime/DownPencil.js";

class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
        this.pause = false;
    }

    static getInstance() {
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance
    }

    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        let top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencil').push(new UpPencil(top));
        this.dataStore.get('pencil').push(new DownPencil(top));
        this.dataStore.canvas.oncontextmenu = (e) => {
            e.preventDefault();
            if (this.pause) {
                this.run();
            }else {
                cancelAnimationFrame(this.dataStore.get('timer'));
            }
            this.pause = !this.pause;
        }
    }

    run() {
        let timer = requestAnimationFrame(()=>this.run());
        this.dataStore.get('background').draw();
        this.dataStore.put('timer', timer);

        const pencil = this.dataStore.get('pencil');
        if(pencil[0].x + pencil[0].width <= 0 && pencil.length === 4){
            pencil.shift();
            pencil.shift();
        }
        if(pencil[0].x <= (window.innerWidth - pencil[0].width) / 2 && pencil.length === 2) {
            this.createPencil();
        }
        this.dataStore.get('pencil').forEach((value)=>{
            value.draw();
        });
        this.dataStore.get('land').draw();
        // cancelAnimationFrame(this.dataStore.get('timer'));
    }
}
export default Director