import Pencil from "./Pencil.js";
import Sprite from "../base/Sprite.js";

class DownPencil extends Pencil{
    constructor(top){
        const image = Sprite.get('pencilDown');
        super(image,top)
    }

    draw() {
        this.gap = window.innerHeight / 5;
        this.y = this.top + this.gap;
        super.draw()
    }
}
export default DownPencil